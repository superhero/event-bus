const
SessionLocator  = require('./session/locator'),
ServerFactory   = require('./server/factory'),
ObserverFactory = require('./observer/factory'),
sessionLocator  = new SessionLocator,
serverFactory   = new ServerFactory(sessionLocator),
observerFactory = new ObserverFactory,
server          = serverFactory.create(),
observers       =
{
  subscribe     : observerFactory.createSubscribeObserver(),
  subscribeOnce : observerFactory.createSubscribeOnceObserver(),
  unsubscribe   : observerFactory.createUnsubscribeObserver()
}

server.attachObserver('subscribe',      observers.subscribe)
server.attachObserver('subscribe-once', observers.subscribeOnce)
server.attachObserver('unsubscribe',    observers.unsubscribe)

server.listen(process.env.SOCKET_PORT)
