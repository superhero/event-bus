describe('event-bus', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  it('dummy', () =>
  {
    expect(1).to.be.equal(1)
  })

  it(' :) ', async () =>
  {
    const
    host                  = 'localhost',
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

    /*
    const
    name        = 'foobar',
    input       = { foo:'bar' },
    commitments = { bar:[] }
    */

    await messageBroker.publishContract(name, input, commitments)

    // redisClient.on('message', (channel, data) => { done(); console.log('***', channel, data) })
    redisClient.do('PUBLISH', 'foochannel', 'foodata')
    // expect(1).to.be.equal(1)

    /*
    var redis = require("redis")
      , subscriber = redis.createClient()
      , publisher  = redis.createClient()
    */

    subscriber.on("message", function(channel, message) {
      console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
    });

    subscriber.subscribe("test");

    publisher.publish("test", "haaaaai");
    publisher.publish("test", "kthxbai");
  })
})

/*
const
socket                = require('@superhero/socket'),
Debug                 = require('@superhero/debug'),
MessageFactory        = require('./message/factory'),
MessageBrokerFactory  = require('./message/broker/factory'),
messageFactory        = new MessageFactory,
messageBroker         = new MessageBrokerFactory(messageFactory),
log                   = new Debug({ debug:true }),
server                = socket.createServer(log)

server.listen(process.env.SOCKET_PORT)
server.on('contract', messageBroker.dispatchContract.bind(messageBroker))
*/
