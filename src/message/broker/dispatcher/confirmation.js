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
   * @param {string} message
   * @param {@superhero.Socket.Context} originContext
   */
  dispatch(message, originContext)
  {
    const confirmation = this.messageFactory.createConfirmationFromSerialized(message)
    originContext.emit(`${completed.contractId}.confirmation`, message)
  }
}

module.exports = ConfirmationDispatcher
