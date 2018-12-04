class AvailibilityRequestPublisher
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
   * @param {string} contractName
   * @param {string} contractId
   * @param {string} commitment
   */
  publish(contractName, contractId, commitment)
  {
    const
    channel = `${contractName}.availibility-request.${commitment}`,
    message = this.messageFactory.createAvailibilityRequest(contractId, commitment),
    serializedAvailibilityRequest = message.serialize()

    this.redisPublisher.publish(channel, serializedAvailibilityRequest)
  }
}

module.exports = AvailibilityRequestPublisher
