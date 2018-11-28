class AvailibilityResponsePublisher
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  async publish(contractId, executionId, commitment, dependencies)
  {
    const
    availibilityResponse            = this.messageFactory.createAvailibilityResponse(contractId, executionId, commitment, dependencies),
    serializedAvailibilityResponse  = availibilityResponse.serialize(),
    availibilityResponseChannel     = `${contractId}.availibility-response`

    await this.redis.do('PUBLISH', availibilityResponseChannel, serializedAvailibilityResponse)
  }
}

module.exports = AvailibilityResponsePublisher
