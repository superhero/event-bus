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
   * @param {@superhero.Socket.Context} originContext
   * @param {string} message
   */
  dispatch(originContext, message)
  {
    const contract = this.messageFactory.createContractFromSerialized(message)

    this.subscribeToContractMessages(contract)
    this.attachDispatcherForAvailibilityResponse(contract)
    this.attachDispatcherForProgress(contract, originContext)
    this.attachDispatcherForCompleted(contract, originContext)
    this.publishAvailibilityRequestForContract(contract)
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
  attachDispatcherForProgress(contract, originContext)
  {
    const
    event       = `${contract.id}.progress`,
    dispatcher  = this.progressDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, originContext, contract)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachDispatcherForCompleted(contract, originContext)
  {
    const
    event       = `${contract.id}.completed`,
    dispatcher  = this.completedDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, originContext)

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
