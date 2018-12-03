const
redis = require('redis'),
util  = require('util')

class RedisFactory
{
  /**
   * @returns {redis.Client}
   */
  createRedisClient(events, host)
  {
    const client = redis.createClient({ host })

    client.on('message', events.emit.bind(events))
    client.do = (command, ...args) =>
    {
      command = `${command}`.toLowerCase()
      return util.promisify(client[command]).call(client, ...args)
    }

    return client
  }
}

module.exports = RedisFactory
