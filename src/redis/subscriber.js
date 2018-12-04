class RedisSubscriber
{
  /**
   * @param {redis.Client} redisClient
   */
  constructor(redisClient)
  {
    this.redisClient = redisClient
  }

  subscribe(...args)
  {
    console.log('subscribe', ...args)
    return this.redisClient.subscribe(...args)
  }

  unsubscribe(...args)
  {
    console.log('unsubscribe', ...args)
    return this.redisClient.unsubscribe(...args)
  }
}

module.exports = RedisSubscriber
