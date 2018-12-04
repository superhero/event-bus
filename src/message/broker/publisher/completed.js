class CompletedPublisher
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
    completed           = this.messageFactory.createCompleted(contract.id),
    completedChannel    = `${contract.id}.completed`,
    serializedCompleted = completed.serialize()

    this.redisPublisher.publish(completedChannel, serializedCompleted)

    contract.completed = true
  }
}

module.exports = CompletedPublisher
