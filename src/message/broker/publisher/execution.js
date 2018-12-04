class ExecutionPublisher
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
    for(const commitment in contract.commitments)
      this.publishExecutionCommitment(contract, contract.commitments[commitment][0])
  }

  /**
   * @protected
   */
  publishExecutionCommitment(contract, availibilityResponse)
  {
    const
    executionId         = availibilityResponse.executionId,
    commitment          = availibilityResponse.commitment,
    channel             = `${contract.id}.execution.${commitment}.${executionId}`,
    executionMessage    = this.messageFactory.createExecution(contract.id, contract.input, commitment),
    serializedExecution = executionMessage.serialize()

    this.redisPublisher.publish(channel, serializedExecution)
  }
}

module.exports = ExecutionPublisher
