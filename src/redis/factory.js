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
    return redis.createClient({ host })
  }

  /**
   * @param {string} host redis
   * @param {console} console
   * @returns {RedisPublisher}
   */
  createRedisPublisher(host, console)
  {
    const
    redisClient     = this.createRedisClient(host),
    redisPublisher  = new RedisPublisher(redisClient, console)

    return redisPublisher
  }

  /**
   * @param {Events} events
   * @param {string} host redis
   * @param {console} console
   * @returns {RedisSubscriber}
   */
  createRedisSubscriber(events, host, console)
  {
    const
    redisClient     = this.createRedisClient(host),
    redisSubscriber = new RedisSubscriber(redisClient, console)

    redisClient.on('message', (...args) =>
    {
      console.log('on message', ...args)
      events.emit(...args)
    })

    return redisSubscriber
  }
}

module.exports = RedisFactory
