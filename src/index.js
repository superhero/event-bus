/*
const
host                  = '??? redis host ???',
Events                = require('events'),
MessageFactory        = require('./message/factory'),
MessageBrokerFactory  = require('./message/broker/factory'),
RedisFactory          = require('./redis/factory'),
events                = new Events(),
redisFactory          = new RedisFactory(),
redisClient           = redisFactory.createRedisClient(events, host),
messageFactory        = new MessageFactory(),
messageBrokerFactory  = new MessageBrokerFactory(messageFactory, events, redisClient),
messageBroker         = messageBrokerFactory.createMessageBroker()

module.exports = messageBroker
*/
