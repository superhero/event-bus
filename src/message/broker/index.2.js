class MessageBroker
{
  /**
   */
  constructor(availibilityRequestSubscriber, contractSubscriber,
              progressPublisher)
  {
    this.availibilityRequestSubscriber  = availibilityRequestSubscriber
    this.contractSubscriber             = contractSubscriber
    this.progressPublisher              = progressPublisher
  }

  /**
   */
  subscribeToContract(contract, originContext)
  {
    return this.contractSubscriber.subscribe(contract, originContext)
  }

  /**
   */
  publishProgress(contractId, output, commitment, final)
  {
    return this.progressPublisher.publish(contractId, output, commitment, final)
  }

  /**
   */
  subscribeToAvailibilityRequest(contractName, commitment, dependencies,
                                 executionObserver, progressObserver)
  {
    return this.availibilityRequestSubscriber.subscribe(
      contractName, commitment, dependencies, executionObserver,
      progressObserver)
  }
}

module.exports = MessageBroker
