class ConfirmationPublisher
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  async publish(contract)
  {
    const
    confirmation            = this.messageFactory.createConfirmation(contract.id),
    confirmationChannel     = `${contract.id}.confirmation`,
    serializedConfirmation  = confirmation.serialize()

    await this.redis.do('PUBLISH', confirmationChannel, serializedConfirmation)

    contract.confirmed = true
  }
}

module.exports = ConfirmationPublisher
