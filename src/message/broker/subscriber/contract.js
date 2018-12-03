// this is not a subscriber, it's more of a handler or dispatcher

class ContractSubscriber
{
  constructor(redisClient, messageFactory, events, availibilityRequestPublisher,
              availibilityResponseSubscriber, progressSubscriber,
              confirmationSubscriber, completedSubscriber)
  {
    this.redis                          = redisClient
    this.messageFactory                 = messageFactory
    this.events                         = events
    this.availibilityRequestPublisher   = availibilityRequestPublisher
    this.availibilityResponseSubscriber = availibilityResponseSubscriber
    this.progressSubscriber             = progressSubscriber
    this.confirmationSubscriber         = confirmationSubscriber
    this.completedSubscriber            = completedSubscriber
  }

  /**
   */
  async subscribe(message, originContext)
  {
    const contract = this.messageFactory.createContractFromSerialized(message)

    this.subscribeToContractMessages(contract)
    this.attachSubscriberForAvailibilityResponse(contract)
    this.attachSubscriberForProgress(originContext, contract)
    this.attachSubscriberForConfirmation(originContext)
    this.attachSubscriberForCompleted(originContext)
    await this.publishAvailibilityRequestForContract(contract)
  }

  /**
   * @protected
   */
  subscribeToContractMessages(contract)
  {
    this.redis.subscribe(`${contract.id}.*`)
  }

  /**
   * @protected
   */
  attachSubscriberForAvailibilityResponse(contract)
  {
    const
    event       = `${contract.id}.availibility-response`,
    subscriber  = this.availibilityResponseSubscriber,
    listener    = subscriber.subscribe.bind(subscriber, contract)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachSubscriberForProgress(originContext, contract)
  {
    const
    event       = `${contract.id}.progress`,
    subscriber  = this.progressSubscriber,
    listener    = subscriber.subscribe.bind(subscriber, originContext, contract)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachSubscriberForConfirmation(originContext)
  {
    const
    event       = `${contract.id}.confirmation`,
    subscriber  = this.confirmationSubscriber,
    listener    = subscriber.subscribe.bind(subscriber, originContext)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  attachSubscriberForCompleted(originContext)
  {
    const
    event       = `${contract.id}.completed`,
    subscriber  = this.completedSubscriber,
    listener    = subscriber.subscribe.bind(subscriber, originContext)

    this.events.on(event, listener)
  }

  /**
   * @protected
   */
  async publishAvailibilityRequestForContract(contract)
  {
    const publisher = this.availibilityRequestPublisher
    for(const commitment in contract.commitments)
      await publisher.publish(contract.name, contract.id, commitment)
  }
}

module.exports = ContractSubscriber
