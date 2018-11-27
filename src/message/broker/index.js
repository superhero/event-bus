class MessageBroker
{
  /**
   * @param {redis.Client} redisClient
   */
  constructor(redisClient, messageFactory, events)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
    this.events         = events

    this.redis.on('message', this.onMessage.bind(this))
  }

  /**
   * @protected
   */
  onMessage(channel, message)
  {
    this.events.emit(channel, message)
  }

  /**
   * @protected
   */
  async onAvailibilityResponse(contract, message)
  {
    // already confirmed? then there's no need to do anything...
    if(contract.confirmed)
      return

    const availibilityResponse = this.messageFactory.createAvailibilityResponseFromSerialized(message)
    contract.commitments[message.commitment].push(availibilityResponse)

    // if we have not recieved responses for every commitment then we have not
    // fulfilled the contract
    for(const availibilityResponses of contract.commitments)
      if(!availibilityResponses.length)
        return

    // send a confirmation message that we have availibility
    {
      const
      confirmation            = this.messageFactory.createConfirmation(contract.id),
      confirmationChannel     = `${contract.id}.confirmation`,
      serializedConfirmation  = confirmation.serialize()

      await this.redis.do('PUBLISH', confirmationChannel, serializedConfirmation)

      contract.confirmed = true
    }

    // fulfilling the contract by sending execution commands to all
    for(const availibilityResponses of contract.commitments)
    {
      const
      availibilityResponse  = availibilityResponses[0],
      executionId           = availibilityResponse.executionId,
      commitment            = availibilityResponse.commitment,
      channel               = `${contract.id}.execution.${commitment}.${executionId}`,
      serializedExecution   = this.messageFactory.createExecution(
        contract.id, contract.input, commitment)

      await this.redis.do('PUBLISH', channel, serializedExecution)
    }
  }

  /**
   * @protected
   */
  onProgress(originContext, contract, message)
  {
    originContext.emit(`${contract.id}.progress`, message)

    const progress = this.messageFactory.createProgressFromSerialized(message)

    for(const availibilityResponses of contract.commitments)
    {
      const availibilityResponse = availibilityResponses[0]
      for(const dependency of availibilityResponse.dependencyEvents)
      {
        if(dependency === progress.commitment)
        {
          const
          executionId = availibilityResponse.executionId,
          channel     = `${contract.id}.progress.${executionId}`

          await this.redis.do('PUBLISH', channel, message)
        }
      }
    }

    if(progress.final)
    {
      contract.completedCommitments = Object.assign({}, contract.commitments, contract.completedCommitments)
      contract.completedCommitments[progress.commitment] = progress.final

      // if all is completed ... then we are done...
      if(Object.keys(contract.completedCommitments).each((key) => contract.completedCommitments[progress.commitment] === true))
      {
        const
        completed           = this.messageFactory.createCompleted(contract.id),
        completedChannel    = `${contract.id}.completed`,
        serializedCompleted = completed.serialize()

        await this.redis.do('PUBLISH', completedChannel, serializedCompleted)

        contract.completed = true
      }
    }
  }

  /**
   * @protected
   */
  onConfirmation(originContext, message)
  {
    const confirmation = this.messageFactory.createConfirmationFromSerialized(message)
    originContext.emit(`${completed.contractId}.confirmation`, message)
  }

  /**
   * @protected
   */
  onCompleted(originContext, message)
  {
    const completed = this.messageFactory.createCompletedFromSerialized(message)
    this.redis.unsubscribe(`${completed.contractId}.*`)
    originContext.emit(`${completed.contractId}.completed`, message)

    this.events.removeAllListeners(`${completed.contractId}.availibility-response`)
    this.events.removeAllListeners(`${completed.contractId}.progress`)
    this.events.removeAllListeners(`${completed.contractId}.confirmation`)
    this.events.removeAllListeners(`${completed.contractId}.completed`)
  }

  /**
   * @public
   */
  async dispatchContract(contract, originContext)
  {
    this.redis.subscribe(`${contract.id}.*`)

    this.events.on(`${contract.id}.availibility-response`, this.onAvailibilityResponse.bind(this, contract))
    this.events.on(`${contract.id}.progress`, this.onProgress.bind(this, originContext, contract))
    this.events.on(`${contract.id}.confirmation`, this.onConfirmation.bind(this, originContext))
    this.events.on(`${contract.id}.completed`, this.onCompleted.bind(this, originContext))

    for(const commitment in contract.commitments)
      await this.dispatchAvailibilityRequest(contract.name, contract.id, commitment)
  }

  /**
   * @public
   */
  async dispatchProgress(contractId, output, commitment, final)
  {
    const
    channel             = `${contractId}.progress`,
    progress            = this.messageFactory.createProgress(contractId, output, commitment, final),
    serializedProgress  = progress.serialize()

    await this.redis.do('PUBLISH', channel, serializedProgress)
  }

  /**
   * @protected
   */
  async dispatchAvailibilityRequest(contractName, contractId, commitment)
  {
    const
    channel = `${contractName}.availibility-request.${commitment}`,
    message = this.messageFactory.createAvailibilityRequest(contractId, commitment),
    serializedAvailibilityRequest = message.serialize()

    await this.redis.do('PUBLISH', channel, serializedAvailibilityRequest)
  }

  /**
   * @public
   */
  onAvailibilityRequest(contractName, commitment, dependencies, executionObserver, progressObserver)
  {
    const subscribeAvailibilityRequestChannel = `${contractName}.availibility-request.${commitment}`
    this.redis.subscribe(subscribeAvailibilityRequestChannel)

    // this listener does not need to be removed. It's expected that once a
    // microservice states they can observe an availibility request, it will
    // not remove it self as a listener for this event
    this.events.on(subscribeAvailibilityRequestChannel, (message) =>
    {
      const
      availibilityRequest                 = this.messageFactory.createAvailibilityRequestFromSerialized(message),
      contractId                          = availibilityRequest.contractId,
      executionId                         = this.createId(),
      serializedAvailibilityResponse      = this.messageFactory.createAvailibilityResponse(contractId, executionId, commitment, dependencies),
      publishAvailibilityResponseChannel  = `${contractId}.availibility-response`,
      subscribeExecutionChannel           = `${contractId}.execution.${commitment}.${executionId}`,
      subscribeProgressChannel            = `${contractId}.progress.${executionId}`,
      subscribeCompletedChannel           = `${contractId}.completed`

      this.redis.do('PUBLISH', publishAvailibilityResponseChannel, serializedAvailibilityResponse)
      this.redis.subscribe(subscribeExecutionChannel)

      this.events.on(subscribeExecutionChannel, (message) =>
      {
        const executionMessage = this.messageFactory.createExecutionFromSerialized(message)
        executionObserver(executionMessage)
        // TODO if error on handling, then publish an error message
      })

      this.events.on(subscribeProgressChannel, (message) =>
      {
        const progressMessage = this.messageFactory.createProgressFromSerialized(message)
        progressObserver(progressMessage)
        // TODO if error on handling, then publish an error message
      })

      this.events.on(subscribeCompletedChannel, () =>
      {
        this.events.removeAllListeners(subscribeCompletedChannel)
        this.events.removeAllListeners(subscribeExecutionChannel)
        this.events.removeAllListeners(subscribeProgressChannel)
      })
    })
  }

  /**
   * @returns {string}
   */
  createId()
  {
    const
    timestamp = Date.now().toString(36),
    random    = Math.random().toString(36).substr(2)
    id        = `${timestamp}-${random}`

    return id
  }
}

module.exports = MessageBroker
