class ProgressTransmitterPublisher
{
  constructor(redisClient)
  {
    this.redis = redisClient
  }

  /**
   * Transmitting the progress message to all dependent commitments in a contract
   */
  async publish(contract, progress, message)
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
}

module.exports = ProgressTransmitterPublisher
