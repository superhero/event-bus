class MessageBroker
{
  /**
   * @param {AvailibilityRequestSubscriber} availibilityRequestSubscriber
   * @param {ProgressPublisher} progressPublisher
   * @param {ContractPublisher} contractPublisher
   * @param {ContractSubscriber} contractSubscriber
   */
  constructor(availibilityRequestSubscriber, progressPublisher,
    contractPublisher, contractSubscriber)
  {
    this.availibilityRequestSubscriber  = availibilityRequestSubscriber
    this.progressPublisher              = progressPublisher
    this.contractPublisher              = contractPublisher
    this.contractSubscriber             = contractSubscriber
  }

  publishContract(...args)
  {
    return this.contractPublisher.publish(...args)
  }

  publishProgress(...args)
  {
    return this.progressPublisher.publish(...args)
  }

  subscribeToAvailibilityRequest(...args)
  {
    return this.availibilityRequestSubscriber.subscribe(...args)
  }

  subscribeToContracts(...args)
  {
    this.contractSubscriber.subscribe(...args)
  }
}

module.exports = MessageBroker
