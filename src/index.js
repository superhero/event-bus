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
