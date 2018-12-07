class MessageBroker
{
  /**
   * @param {AvailibilityRequestSubscriber} availibilityRequestSubscriber
   * @param {ProgressPublisher} progressPublisher
   * @param {ContractDispatcher} contractDispatcher
   */
  constructor(availibilityRequestSubscriber, progressPublisher,
    contractDispatcher)
  {
    this.availibilityRequestSubscriber  = availibilityRequestSubscriber
    this.progressPublisher              = progressPublisher
    this.contractDispatcher             = contractDispatcher
  }

  dispatchContract(originEmitter, name, input, commitments)
  {
    this.contractDispatcher.dispatch(originEmitter, name, input, commitments)
  }

  publishProgress(contractId, output, commitment, final)
  {
    this.progressPublisher.publish(contractId, output, commitment, final)
  }

  subscribeToAvailibilityRequest(contractName, commitment, dependencies, executionObserver, progressObserver)
  {
    this.availibilityRequestSubscriber.subscribe(contractName, commitment, dependencies, executionObserver, progressObserver)
  }
}

module.exports = MessageBroker
