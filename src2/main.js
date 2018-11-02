const
Debug         = require('@superhero/debug'),
Socket        = require('@superhero/socket'),
Subscribe     = require('./observer/subscribe'),
SubscribeOnce = require('./observer/subscribe-once'),
Unsubscribe   = require('./observer/unsubscribe'),
log           = new Debug({ debug:true }),
server        = Socket.Server.from(log),
subscribe     = new Subscribe(server),
subscribeOnce = new SubscribeOnce(server),
unsubscribe   = new Unsubscribe(server)

server.on(subscribe.event,      subscribe.dispatch.bind(subscribe))
server.on(subscribeOnce.event,  subscribeOnce.dispatch.bind(subscribeOnce))
server.on(unsubscribe.event,    unsubscribe.dispatch.bind(unsubscribe))

server.listen(process.env.HTTP_PORT)
