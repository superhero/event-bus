class ExecutionPublisher
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
    for(const availibilityResponses of contract.commitments)
      this.publishExecutionCommitment(contract, availibilityResponses[0])
  }

  /**
   * @protected
   */
  async publishExecutionCommitment(contract, availibilityResponse)
  {
    const
    executionId           = availibilityResponse.executionId,
    commitment            = availibilityResponse.commitment,
    channel               = `${contract.id}.execution.${commitment}.${executionId}`,
    serializedExecution   = this.messageFactory.createExecution(
      contract.id, contract.input, commitment)

    await this.redis.do('PUBLISH', channel, serializedExecution)
  }
}

module.exports = ExecutionPublisher
