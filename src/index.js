const
Events                = require('events'),
MessageFactory        = require('./message/factory'),
MessageBrokerFactory  = require('./message/broker/factory'),
RedisFactory          = require('./redis/factory')

class EventBusFactory
{
  /**
   * @param {string} host redis host
   */
  create(host)
  {
    const
    events                  = new Events(),
    redisFactory            = new RedisFactory(),
    redisPublisher          = redisFactory.createRedisPublisher(host),
    redisSubscriber         = redisFactory.createRedisSubscriber(events, host),
    messageFactory          = new MessageFactory(),
    messageBrokerFactory    = new MessageBrokerFactory(messageFactory, events, redisPublisher, redisSubscriber),
    messageBroker           = messageBrokerFactory.createMessageBroker()

    return new class EventBus
    {
      constructor()
      {
        this.events         = events
        this.messageBroker  = messageBroker
        this.messageFactory = messageFactory
        this.redis          =
        {
          publisher   : redisPublisher,
          subscriber  : redisSubscriber
        }
      }
    }
  }
}

module.exports = EventBusFactory
