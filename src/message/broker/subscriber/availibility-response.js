class AvailibilityResponseSubscriber
{
  constructor(redisClient, messageFactory, executionPublisher, confirmationPublisher)
  {
    this.redis                  = redisClient
    this.messageFactory         = messageFactory
    this.executionPublisher     = executionPublisher
    this.confirmationPublisher  = confirmationPublisher
  }

  async subscribe(contract, message)
  {
    // already confirmed? then there's no need to do anything...
    if(this.isContractConfirmed(contract))
      return

    this.pushAvailibilityResponseToContractCommitment(contract, message)

    // if we have not recieved responses for every commitment then we have not
    // fulfilled the contract
    if(this.isContractNotAvailibleForExecution(contract))
      return

    await this.confirmationPublisher.publish(contract)
    await this.executionPublisher.publish(contract)
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
  isContractNotAvailibleForExecution(contract)
  {
    for(const availibilityResponses of contract.commitments)
      if(!availibilityResponses.length)
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

module.exports = AvailibilityResponseSubscriber
