class AvailibilityRequestSubscriber
{
  /**
   * @param {RedisSubscriber} redisSubscriber
   * @param {MessageFactory} messageFactory
   * @param {Events} events
   * @param {AvailibilityResponsePublisher} availibilityResponsePublisher
   */
  constructor(redisSubscriber, messageFactory, events, availibilityResponsePublisher)
  {
    this.redisSubscriber                = redisSubscriber
    this.messageFactory                 = messageFactory
    this.events                         = events
    this.availibilityResponsePublisher  = availibilityResponsePublisher
  }

  /**
   * @param {string} contractName
   * @param {string} commitment
   * @param {Array<string>} dependencies
   * @param {function} executionObserver
   * @param {function} progressObserver
   */
  subscribe(contractName, commitment, dependencies, executionObserver, progressObserver)
  {
    const availibilityRequestChannel = `${contractName}.availibility-request.${commitment}`
    this.redisSubscriber.subscribe(availibilityRequestChannel)
    this.attachListenerForAvailibilityRequest(availibilityRequestChannel, commitment, dependencies, executionObserver, progressObserver)
  }

  /**
   * @protected
   */
  attachListenerForAvailibilityRequest(availibilityRequestChannel, ...args)
  {
    const listener = this.onAvailibilityRequest.bind(this, ...args)
    // this listener does not need to be removed. It's expected that once a
    // microservice states they can observe an availibility request, it will
    // not remove it self as a listener for this event
    this.events.on(availibilityRequestChannel, listener)
  }

  /**
   * @protected
   */
  onAvailibilityRequest(commitment, dependencies, executionObserver, progressObserver, message)
  {
    const
    availibilityRequest = this.messageFactory.createAvailibilityRequestFromSerialized(message),
    contractId          = availibilityRequest.contractId,
    executionId         = this.createExecutionId(),
    executionChannel    = `${contractId}.execution.${commitment}.${executionId}`,
    progressChannel     = `${contractId}.progress.${executionId}`,
    completedChannel    = `${contractId}.completed`

    this.availibilityResponsePublisher.publish(contractId, executionId, commitment, dependencies)
    this.redisSubscriber.subscribe(executionChannel)

    this.forwardExecutionEventToObserver(executionChannel, executionObserver)
    this.forwardProgressEventToObserver(progressChannel, progressObserver)
    this.removeAllListenersOnCompleted(completedChannel, executionChannel, progressChannel)
  }

  /**
   * @protected
   * @returns {string}
   */
  createExecutionId()
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
  forwardExecutionEventToObserver(executionChannel, executionObserver)
  {
    this.events.on(executionChannel, (message) =>
    {
      const executionMessage = this.messageFactory.createExecutionFromSerialized(message)
      executionObserver(executionMessage)
      // TODO if error on handling, then publish an error message
    })
  }

  /**
   * @protected
   */
  forwardProgressEventToObserver(progressChannel, progressObserver)
  {
    this.events.on(progressChannel, (message) =>
    {
      const progressMessage = this.messageFactory.createProgressFromSerialized(message)
      progressObserver(progressMessage)
      // TODO if error on handling, then publish an error message
    })
  }

  /**
   * @protected
   */
  removeAllListenersOnCompleted(completedChannel, executionChannel, progressChannel)
  {
    this.events.on(completedChannel, () =>
    {
      this.events.removeAllListeners(completedChannel)
      this.events.removeAllListeners(executionChannel)
      this.events.removeAllListeners(progressChannel)
    })
  }
}

module.exports = AvailibilityRequestSubscriber
