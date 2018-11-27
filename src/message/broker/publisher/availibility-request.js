class AvailibilityRequestPublisher
{
  constructor(messageFactory, redis)
  {
    this.messageFactory = messageFactory
    this.redis          = redis
  }

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
