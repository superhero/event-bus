const
redis           = require('redis'),
RedisPublisher  = require('./publisher'),
RedisSubscriber = require('./subscriber')

class RedisFactory
{
  /**
   * @param {string} host redis
   * @returns {redis.Client}
   */
  createRedisClient(host)
  {
    const client = redis.createClient({ host })
    return client
  }

  /**
   * @param {string} host redis
   * @returns {RedisPublisher}
   */
  createRedisPublisher(host)
  {
    const
    redisClient     = this.createRedisClient(host),
    redisPublisher  = new RedisPublisher(redisClient)

    return redisPublisher
  }

  /**
   * @param {Events} events
   * @param {string} host redis
   * @returns {RedisSubscriber}
   */
  createRedisSubscriber(events, host)
  {
    const
    redisClient     = this.createRedisClient(host),
    redisSubscriber = new RedisSubscriber(redisClient)

    redisClient.on('message', (...args) =>
    {
      console.log('on message', ...args)
      events.emit(...args)
    })

    return redisSubscriber
  }
}

module.exports = RedisFactory
