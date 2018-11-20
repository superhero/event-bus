const
SessionLocator  = require('./session/locator'),
ServerFactory   = require('./server/factory'),
ObserverFactory = require('./observer/factory'),
sessionLocator  = new SessionLocator,
serverFactory   = new ServerFactory(sessionLocator),
observerFactory = new ObserverFactory,
server          = serverFactory.create()

server.attachObserver('contract', observerFactory.createContractObserver())

server.listen(process.env.SOCKET_PORT)
