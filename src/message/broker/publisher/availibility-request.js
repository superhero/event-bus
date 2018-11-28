class AvailibilityRequestPublisher
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  async publish(contractName, contractId, commitment)
  {
    const
    channel = `${contractName}.availibility-request.${commitment}`,
    message = this.messageFactory.createAvailibilityRequest(contractId, commitment),
    serializedAvailibilityRequest = message.serialize()

    await this.redis.do('PUBLISH', channel, serializedAvailibilityRequest)
  }
}

module.exports = AvailibilityRequestPublisher
