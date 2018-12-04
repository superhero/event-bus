class CompletedDispatcher
{
  /**
   * @param {RedisSubscriber} redisSubscriber
   * @param {MessageFactory} messageFactory
   * @param {Events} events
   */
  constructor(redisSubscriber, messageFactory, events)
  {
    this.redisSubscriber  = redisSubscriber
    this.messageFactory   = messageFactory
    this.events           = events
  }

  /**
   * @param {@superhero.Socket.Context} originContext
   * @param {string} message
   */
  dispatch(originContext, message)
  {
    const completed = this.messageFactory.createCompletedFromSerialized(message)

    this.unsubscribeToContractMessagesInRedis(completed)
    this.forwardCompletedMessageToOrigin(originContext, completed, message)
    this.removeEventListenersByContractId(completed.contractId)
  }

  /**
   * @protected
   */
  unsubscribeToContractMessagesInRedis(completed)
  {
    this.redisSubscriber.unsubscribe(`${completed.contractId}.*`)
  }

  /**
   * @protected
   */
  forwardCompletedMessageToOrigin(originContext, completed, message)
  {
    originContext.emit(`${completed.contractId}.completed`, message)
  }

  /**
   * @protected
   */
  removeEventListenersByContractId(contractId)
  {
    this.events.removeAllListeners(`${contractId}.availibility-response`)
    this.events.removeAllListeners(`${contractId}.progress`)
    this.events.removeAllListeners(`${contractId}.confirmation`)
    this.events.removeAllListeners(`${contractId}.completed`)
  }
}

module.exports = CompletedDispatcher
