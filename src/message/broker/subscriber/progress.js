class ProgressSubscriber
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  subscribe(originContext, contract, message)
  {
    this.forwardProgressMessageToOrigin(originContext, contract, message)
    const progress = this.messageFactory.createProgressFromSerialized(message)
    this.forwardProgressMessageToDependentAvailibilityResponse(contract, progress, message)

    if(progress.final)
    {
      this.setContractCommitmentAsCompleted(contract)

      if(this.isAllCommitmentsCompleted(contract))
        await this.publishCompleted(contract)
    }
  }

  /**
   * @protected
   */
  forwardProgressMessageToOrigin(originContext, contract, message)
  {
    originContext.emit(`${contract.id}.progress`, message)
  }

  /**
   * @protected
   */
  forwardProgressMessageToDependentAvailibilityResponse(contract, progress, message)
  {
    for(const availibilityResponses of contract.commitments)
    {
      // only the first availibility response is of any interest
      const availibilityResponse = availibilityResponses[0]

      for(const dependency of availibilityResponse.dependencyEvents)
      {
        if(dependency === progress.commitment)
        {
          const
          executionId = availibilityResponse.executionId,
          channel     = `${contract.id}.progress.${executionId}`

          await this.redis.do('PUBLISH', channel, message)
        }
      }
    }
  }

  /**
   * @protected
   */
  setContractCommitmentAsCompleted(contract)
  {
    if(!contract.completedCommitments)
      contract.completedCommitments = {}

    contract.completedCommitments[progress.commitment] = true
  }

  /**
   * @protected
   */
  async publishCompleted(contract)
  {
    const
    completed           = this.messageFactory.createCompleted(contract.id),
    completedChannel    = `${contract.id}.completed`,
    serializedCompleted = completed.serialize()

    await this.redis.do('PUBLISH', completedChannel, serializedCompleted)

    contract.completed = true
  }

  /**
   * @protected
   */
  isAllCommitmentsCompleted(contract)
  {
    contract.commitments.each((key) => contract.completedCommitments[key])
  }
}

module.exports = ProgressSubscriber
