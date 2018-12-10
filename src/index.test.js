describe('Event Bus', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  it('is possible to dispatch and complete a contract', (done) =>
  {
    const
    host                = 'localhost',
    EventBusFactory     = require('.'),
    eventBusFactory     = new EventBusFactory,
    eventBus            = eventBusFactory.create(host),
    contractName        = 'foobar',
    input               = undefined,
    output              = undefined,
    commitmentA         = 'bar',
    commitmentB         = 'baz',
    commitments         = [commitmentA, commitmentB],
    dependencies        = [],
    completed           = () =>
    {
      eventBus.redis.publisher.redisClient.quit()
      eventBus.redis.subscriber.redisClient.quit()
      done()
    },
    originEmitter       = { emit:(channel)    => channel === 'completed' && completed() },
    executionObserverA  = (messageExecution)  => eventBus.messageBroker.publishProgress(messageExecution.contractId, output, messageExecution.commitment, true),
    executionObserverB  = (messageExecution)  => {},
    progressObserverB   = (messageProgress)   => eventBus.messageBroker.publishProgress(messageProgress.contractId, output, commitmentB, true)

    eventBus.messageBroker.subscribeToAvailibilityRequest(contractName, commitmentA, dependencies,  executionObserverA)
    eventBus.messageBroker.subscribeToAvailibilityRequest(contractName, commitmentB, [commitmentA], executionObserverB, progressObserverB)

    eventBus.messageBroker.dispatchContract(originEmitter, contractName, input, commitments)
  })
})
