class AvailibilityResponseDispatcher
{
  /**
   * @param {MessageFactory} messageFactory
   * @param {ExecutionPublisher} executionPublisher
   * @param {ConfirmationPublisher} confirmationPublisher
   */
  constructor(messageFactory, executionPublisher, confirmationPublisher)
  {
    this.messageFactory         = messageFactory
    this.executionPublisher     = executionPublisher
    this.confirmationPublisher  = confirmationPublisher
  }

  /**
   * @param {MessageContract} contract
   * @param {string} message
   */
  dispatch(contract, message)
  {
    // already confirmed? then there's no need to do anything...
    if(this.isContractConfirmed(contract))
      return

    this.pushAvailibilityResponseToContractCommitment(contract, message)

    // if we have not recieved responses for every commitment then we have not
    // fulfilled the contract
    if(!this.isContractAvailibleForExecution(contract))
      return

    this.confirmationPublisher.publish(contract)
    this.executionPublisher.publish(contract)
  }

  /**
   * @protected
   */
  isContractConfirmed(contract)
  {
    return !! contract.confirmed
  }

  /**
   * @protected
   */
  isContractAvailibleForExecution(contract)
  {
    for(const commitment in contract.commitments)
      if(!contract.commitments[commitment].length)
        return false

    return true
  }

  /**
   * @protected
   */
  pushAvailibilityResponseToContractCommitment(contract, message)
  {
    const availibilityResponse = this.messageFactory.createAvailibilityResponseFromSerialized(message)
    contract.commitments[availibilityResponse.commitment].push(availibilityResponse)
  }
}

module.exports = AvailibilityResponseDispatcher
