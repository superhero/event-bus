describe('Observer', () =>
{
  const expect = require('chai').expect

  it('is possible to create the different observers', () =>
  {
    const
    SubscribeOnce   = require('./subscribe-once'),
    Subscribe       = require('./subscribe'),
    Unsubscribe     = require('./unsubscribe'),
    ObserverFactory = require('./factory'),
    observerFactory = new ObserverFactory,
    subscribe       = observerFactory.createSubscribeObserver(),
    subscribeOnce   = observerFactory.createSubscribeOnceObserver(),
    unsubscribe     = observerFactory.createUnsubscribeObserver()

    expect(subscribeOnce).to.be.an.instanceof(SubscribeOnce)
    expect(subscribe).to.be.an.instanceof(Subscribe)
    expect(unsubscribe).to.be.an.instanceof(Unsubscribe)
  })
})
