class ProgressTransmitterPublisher
{
  /**
   * @param {RedisPublisher} redisPublisher
   */
  constructor(redisPublisher)
  {
    this.redisPublisher = redisPublisher
  }

  /**
   * Transmitting the progress message to all dependent commitments in a
   * contract
   * @param {MessageContract} contract
   * @param {MessageProgress} progress
   * @param {string} message serialized MessageProgress ready to be transmitted
   */
  publish(contract, progress, message)
  {
    for(const commitment in contract.commitments)
    {
      // only the first availibility response is of any interest
      const availibilityResponse = contract.commitments[commitment][0]

      for(const dependency of availibilityResponse.dependencies)
      {
        if(dependency === progress.commitment)
        {
          const
          executionId = availibilityResponse.executionId,
          channel     = `${contract.id}.progress.${executionId}`

          this.redisPublisher.publish(channel, message)
        }
      }
    }
  }
}

module.exports = ProgressTransmitterPublisher
