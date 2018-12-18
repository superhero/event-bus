class RedisPublisher
{
  /**
   * @param {redis.Client} redisClient
   */
  constructor(redisClient, console)
  {
    this.redisClient  = redisClient
    this.console      = console
  }

  publish(...args)
  {
    const hasSubscriber = this.redisClient.publish(...args)

    this.console.log('publish', 'has subscriber:', hasSubscriber, ...args)

    if(!hasSubscriber)
      setTimeout(this.publish.bind(this, ...args), 100)
  }
}

module.exports = RedisPublisher
