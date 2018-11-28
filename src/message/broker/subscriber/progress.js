class ProgressSubscriber
{
  constructor(redisClient, messageFactory, completedPublisher,
              progressTransmitterPublisher)
  {
    this.redis                        = redisClient
    this.messageFactory               = messageFactory
    this.completedPublisher           = completedPublisher
    this.progressTransmitterPublisher = progressTransmitterPublisher
  }

  /**
   */
  subscribe(originContext, contract, message)
  {
    this.forwardProgressMessageToOrigin(originContext, contract, message)
    const progress = this.messageFactory.createProgressFromSerialized(message)
    // forward progress message to dependent availibility response
    this.progressTransmitterPublisher.publish(contract, progress, message)

    if(progress.final)
    {
      this.setContractCommitmentAsCompleted(contract, progress.commitment)

      if(this.isAllCommitmentsCompleted(contract))
        await this.completedPublisher.publish(contract)
    }
  }

  /**
   * @protected
   */
  forwardProgressMessageToOrigin(originContext, contract, message)
  {
    originContext.emit(`${contract.id}.progress`, message)
  }

  /**
   * @protected
   */
  setContractCommitmentAsCompleted(contract, commitment)
  {
    if(!contract.completedCommitments)
      contract.completedCommitments = {}

    contract.completedCommitments[commitment] = true
  }

  /**
   * @protected
   */
  isAllCommitmentsCompleted(contract)
  {
    const commitments = Object.keys(contract.commitments)
    return commitments.each((key) => contract.completedCommitments[key])
  }
}

module.exports = ProgressSubscriber
