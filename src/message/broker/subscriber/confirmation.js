class ConfirmationSubscriber
{
  constructor(messageFactory)
  {
    this.messageFactory = messageFactory
  }

  /**
   */
  subscribe(originContext, message)
  {
    const confirmation = this.messageFactory.createConfirmationFromSerialized(message)
    originContext.emit(`${completed.contractId}.confirmation`, message)
  }
}

module.exports = ConfirmationSubscriber
