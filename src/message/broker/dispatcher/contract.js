class ContractDispatcher
{
  /**
   * @param {RedisSubscriber} redisSubscriber
   * @param {MessageFactory} messageFactory
   * @param {Events} events
   * @param {AvailibilityRequestPublisher} availibilityRequestPublisher
   * @param {AvailibilityResponseDispatcher} availibilityResponseDispatcher
   * @param {ProgressDispatcher} progressDispatcher
   * @param {CompletedDispatcher} completedDispatcher
   */
  constructor(redisSubscriber, messageFactory, events,
              availibilityRequestPublisher, availibilityResponseDispatcher,
              progressDispatcher, completedDispatcher)
  {
    this.redisSubscriber                = redisSubscriber
    this.messageFactory                 = messageFactory
    this.events                         = events
    this.availibilityRequestPublisher   = availibilityRequestPublisher
    this.availibilityResponseDispatcher = availibilityResponseDispatcher
    this.progressDispatcher             = progressDispatcher
    this.completedDispatcher            = completedDispatcher
  }

  /**
   * @param {Emitter} originEmitter
   * @param {string} name
   * @param {*} input
   * @param {Array<string>} commitments
   */
  dispatch(originEmitter, name, input, commitments)
  {
    const
    contractId = this.createContractId(),
    contract   = this.messageFactory.createContract(contractId, name, input, commitments)

    this.subscribeToContractMessages(contract)
    this.attachDispatcherForAvailibilityResponse(contract)
    this.attachDispatcherForProgress(contract, originEmitter)
    this.attachDispatcherForCompleted(contract, originEmitter)
    this.publishAvailibilityRequestForContract(contract)
  }

  /**
   * @protected
   * @returns {string}
   */
  createContractId()
  {
    const
    timestamp = Date.now().toString(36),
    random    = Math.random().toString(36).substr(2),
    id        = `${timestamp}-${random}`

    return id
  }

  /**
   * @protected
   */
  subscribeToContractMessages(contract)
  {
    this.redisSubscriber.subscribe(`${contract.id}.availibility-response`)
    this.redisSubscriber.subscribe(`${contract.id}.confirmation`)
    this.redisSubscriber.subscribe(`${contract.id}.progress`)
    this.redisSubscriber.subscribe(`${contract.id}.completed`)
  }

  /**
   * @protected
   */
  attachDispatcherForAvailibilityResponse(contract)
  {
    const
    event       = `${contract.id}.availibility-response`,
    dispatcher  = this.availibilityResponseDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, contract)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachDispatcherForProgress(contract, originEmitter)
  {
    const
    event       = `${contract.id}.progress`,
    dispatcher  = this.progressDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, originEmitter, contract)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachDispatcherForCompleted(contract, originEmitter)
  {
    const
    event       = `${contract.id}.completed`,
    dispatcher  = this.completedDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, originEmitter)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  publishAvailibilityRequestForContract(contract)
  {
    const publisher = this.availibilityRequestPublisher
    for(const commitment in contract.commitments)
      publisher.publish(contract.name, contract.id, commitment)
  }
}

module.exports = ContractDispatcher
