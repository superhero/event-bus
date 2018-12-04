class ProgressPublisher
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
   * @param {string} contractId
   * @param {*} output
   * @param {string} commitment
   * @param {boolean} final
   */
  publish(contractId, output, commitment, final)
  {
    const
    channel = `${contractId}.progress`,
    message = this.messageFactory.createProgress(contractId, output, commitment, final),
    serializedProgress = message.serialize()

    this.redisPublisher.publish(channel, serializedProgress)
  }
}

module.exports = ProgressPublisher
