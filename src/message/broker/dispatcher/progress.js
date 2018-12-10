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
   * @param {Emitter} originEmitter
   * @param {MessageContract} contract
   * @param {string} message
   */
  dispatch(originEmitter, contract, message)
  {
    this.forwardProgressMessageToOrigin(originEmitter, contract, message)
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
  forwardProgressMessageToOrigin(originEmitter, contract, message)
  {
    originEmitter.emit('progress', message)
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
