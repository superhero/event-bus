class ContractSubscriber
{
  /**
   * @param {RedisSubscriber} redisSubscriber
   * @param {ContractDispatcher} contractDispatcher
   * @param {Events} events
   */
  constructor(redisSubscriber, contractDispatcher, events)
  {
    this.redisSubscriber    = redisSubscriber
    this.contractDispatcher = contractDispatcher
    this.events             = events
  }

  /**
   * @param {@superhero.Socket.Context} originContext
   */
  subscribe(originContext)
  {
    const
    dispatcher  = this.contractDispatcher,
    listener    = dispatcher.dispatch.bind(dispatcher, originContext)

    this.redisSubscriber.subscribe('contract')
    this.events.on('contract', listener)
  }
}

module.exports = ContractSubscriber
