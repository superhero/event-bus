class RedisPublisher
{
  /**
   * @param {redis.Client} redisClient
   */
  constructor(redisClient)
  {
    this.redisClient = redisClient
  }

  publish(...args)
  {
    const hasSubscriber = this.redisClient.publish(...args)
    console.log('publish', hasSubscriber, ...args)

    if(!hasSubscriber)
      setTimeout(this.publish.bind(this, ...args), 100)
  }
}

module.exports = RedisPublisher
