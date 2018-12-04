class ProgressDispatcher
{
  /**
   * @param {MessageFactory} messageFactory
   * @param {CompletedPublisher} completedPublisher
   * @param {ProgressTransmitterPublisher} progressTransmitterPublisher
   */
  constructor(messageFactory, completedPublisher, progressTransmitterPublisher)
  {
    this.messageFactory               = messageFactory
    this.completedPublisher           = completedPublisher
    this.progressTransmitterPublisher = progressTransmitterPublisher
  }

  /**
   * @param {@superhero.Socket.Context} originContext
   * @param {MessageContract} contract
   * @param {string} message
   */
  dispatch(originContext, contract, message)
  {
    this.forwardProgressMessageToOrigin(originContext, contract, message)
    const progress = this.messageFactory.createProgressFromSerialized(message)
    // forward progress message to dependent availibility response
    this.progressTransmitterPublisher.publish(contract, progress, message)

    if(progress.final)
    {
      this.setContractCommitmentAsCompleted(contract, progress.commitment)

      if(this.isAllCommitmentsCompleted(contract))
        this.completedPublisher.publish(contract)
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
    const
    commitments     = Object.keys(contract.commitments),
    isAllCompleted  = commitments.every((key) => contract.completedCommitments[key])

    return isAllCompleted
  }
}

module.exports = ProgressDispatcher
