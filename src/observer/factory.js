const
SubscribeObserver     = require('./subscribe'),
SubscribeOnceObserver = require('./subscribe-once'),
UnsubscribeObserver   = require('./unsubscribe')

class ObserverFactory
{
  createSubscribeObserver()
  {
    return new SubscribeObserver
  }

  createSubscribeOnceObserver()
  {
    return new SubscribeOnceObserver
  }

  createUnsubscribeObserver()
  {
    return new UnsubscribeObserver
  }
}

module.exports = ObserverFactory
