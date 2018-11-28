class CompletedPublisher
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
    completed           = this.messageFactory.createCompleted(contract.id),
    completedChannel    = `${contract.id}.completed`,
    serializedCompleted = completed.serialize()

    await this.redis.do('PUBLISH', completedChannel, serializedCompleted)

    contract.completed = true
  }
}

module.exports = CompletedPublisher
