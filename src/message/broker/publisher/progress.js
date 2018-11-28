class ProgressPublisher
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  async publish(contractId, output, commitment, final)
  {
    const
    channel = `${contractId}.progress`,
    message = this.messageFactory.createProgress(contractId, output, commitment, final),
    serializedProgress = message.serialize()

    await this.redis.do('PUBLISH', channel, serializedProgress)
  }
}

module.exports = ProgressPublisher
