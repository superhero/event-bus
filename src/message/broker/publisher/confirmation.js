class ConfirmationPublisher
{
  /**
   * @param {RedisPublisher} redisPublisher
   * @param {MessageFactory} messageFactory
   */
  constructor(redisPublisher, messageFactory)
  {
    this.redisPublisher = redisPublisher
    this.messageFactory = messageFactory
  }

  /**
   * @param {MessageContract} contract
   */
  publish(contract)
  {
    const
    confirmation            = this.messageFactory.createConfirmation(contract.id),
    confirmationChannel     = `${contract.id}.confirmation`,
    serializedConfirmation  = confirmation.serialize()

    this.redisPublisher.publish(confirmationChannel, serializedConfirmation)

    contract.confirmed = true
  }
}

module.exports = ConfirmationPublisher
