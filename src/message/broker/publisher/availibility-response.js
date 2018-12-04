class AvailibilityResponsePublisher
{
  /**
   * @param {RedisPublisher} redisPublisher
   * @param {RedisSubscriber} redisSubscriber
   * @param {MessageFactory} messageFactory
   */
  constructor(redisPublisher, redisSubscriber, messageFactory)
  {
    this.redisPublisher   = redisPublisher
    this.redisSubscriber  = redisSubscriber
    this.messageFactory   = messageFactory
  }

  /**
   * @param {string} contractId
   * @param {string} executionId
   * @param {string} commitment
   * @param {Array<string>} dependencies
   */
  publish(contractId, executionId, commitment, dependencies)
  {
    const
    availibilityResponse            = this.messageFactory.createAvailibilityResponse(contractId, executionId, commitment, dependencies),
    serializedAvailibilityResponse  = availibilityResponse.serialize(),
    availibilityResponseChannel     = `${contractId}.availibility-response`,
    progressChannel                 = `${contractId}.progress.${executionId}`

    this.redisSubscriber.subscribe(progressChannel)
    this.redisPublisher.publish(availibilityResponseChannel, serializedAvailibilityResponse)
  }
}

module.exports = AvailibilityResponsePublisher
