const
ContractObserver    = require('./contract'),
SubscribeObserver   = require('./subscribe'),
UnsubscribeObserver = require('./unsubscribe')

class ObserverFactory
{
  constructor(contractFactory)
  {
    this.contractFactory = contractFactory
  }

  createContractObserver()
  {
    return new ContractObserver(this.contractFactory)
  }

  createSubscribeObserver()
  {
    return new SubscribeObserver
  }

  createUnsubscribeObserver()
  {
    return new UnsubscribeObserver
  }
}

module.exports = ObserverFactory
