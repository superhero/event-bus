describe('Event Bus', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  it('is possible to dispatch and complete a contract', (done) =>
  {
    const
    host                = 'localhost',
    Debug               = require('@superhero/debug'),
    console_red         = new Debug({ color:'red'  }),
    console_blue        = new Debug({ color:'blue' }),
    EventBusFactory     = require('.'),
    eventBusFactory     = new EventBusFactory,
    eventBus_publisher  = eventBusFactory.create(host, console_red),
    eventBus_subscriber = eventBusFactory.create(host, console_blue),
    contractName        = 'foobar',
    input               = undefined,
    output              = undefined,
    commitmentA         = 'bar',
    commitmentB         = 'baz',
    dependencies        = [],
    completed           = () =>
    {
      eventBus_publisher.redis.publisher.redisClient.quit()
      eventBus_publisher.redis.subscriber.redisClient.quit()

      eventBus_subscriber.redis.publisher.redisClient.quit()
      eventBus_subscriber.redis.subscriber.redisClient.quit()

      done()
    },
    originEmitter       = { emit:(channel)    => channel === 'completed' && completed() },
    executionObserverA  = (messageExecution)  => eventBus_subscriber.messageBroker.publishProgress(messageExecution.contractId, output, messageExecution.commitment, true),
    executionObserverB  = (messageExecution)  => {},
    progressObserverB   = (messageProgress)   => eventBus_subscriber.messageBroker.publishProgress(messageProgress.contractId, output, commitmentB, true)

    eventBus_subscriber.messageBroker.subscribeToAvailibilityRequest(contractName, commitmentA, dependencies,  executionObserverA)
    eventBus_subscriber.messageBroker.subscribeToAvailibilityRequest(contractName, commitmentB, [commitmentA], executionObserverB, progressObserverB)

    eventBus_publisher.messageBroker.dispatchContract(originEmitter, contractName, input, [commitmentA, commitmentB])
  })
})
