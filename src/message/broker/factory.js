const
MessageBroker = require('.'),
redis         = require('redis'),
util          = require('util'),
Events        = require('events')

class MessageBrokerFactory
{
  constructor(messageFactory)
  {
    this.messageFactory = messageFactory
    this.redis          = this.createRedisClient()
    this.events         = this.createEvents()
  }

  /**
   * @returns {MessageBroker}
   */
  createMessageBroker()
  {
    return new MessageBroker(this.redis, this.messageFactory, this.events)
  }

  /**
   * @returns {events}
   */
  createEvents()
  {
    return new Events
  }

  /**
   * @returns {redis.Client}
   */
  createRedisClient()
  {
    const client = redis.createClient()

    client.do = (command, ...args) =>
    {
      command = `${command}`.toLowerCase()
      util.promisify(client[command]).call(client, ...args)
    }

    return client
  }
}

module.exports = MessageBrokerFactory
