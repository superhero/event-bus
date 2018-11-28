class AvailibilityResponseSubscriber
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
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

    await this.publishAConfirmationMessageThatWeHaveAvailibility(contract)
    await this.fulfillContractByPublishingExecutionCommandsToAllAvailibileResponses(contract)
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

  /**
   * @protected
   */
  async publishAConfirmationMessageThatWeHaveAvailibility(contract)
  {
    const
    confirmation            = this.messageFactory.createConfirmation(contract.id),
    confirmationChannel     = `${contract.id}.confirmation`,
    serializedConfirmation  = confirmation.serialize()

    await this.redis.do('PUBLISH', confirmationChannel, serializedConfirmation)

    contract.confirmed = true
  }

  /**
   * @protected
   */
  async fulfillContractByPublishingExecutionCommandsToAllAvailibileResponses(contract)
  {
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
}

module.exports = AvailibilityResponseSubscriber
