class RedisSubscriber
{
  /**
   * @param {redis.Client} redisClient
   */
  constructor(redisClient, console)
  {
    this.redisClient = redisClient
    this.console     = console
  }

  subscribe(...args)
  {
    this.console.log('subscribe', ...args)
    return this.redisClient.subscribe(...args)
  }

  unsubscribe(...args)
  {
    this.console.log('unsubscribe', ...args)
    return this.redisClient.unsubscribe(...args)
  }
}

module.exports = RedisSubscriber
