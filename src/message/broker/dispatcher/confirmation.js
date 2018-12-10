class ConfirmationDispatcher
{
  /**
   * @param {MessageFactory} messageFactory
   */
  constructor(messageFactory)
  {
    this.messageFactory = messageFactory
  }

  /**
   * @param {Emitter} originEmitter
   * @param {string} contractId
   */
  dispatch(originEmitter, contractId)
  {
    const
    confirmation            = this.messageFactory.createConfirmation(contractId),
    serializedConfirmation  = confirmation.serialize()

    originEmitter.emit('confirmation', serializedConfirmation)
  }
}

module.exports = ConfirmationDispatcher
