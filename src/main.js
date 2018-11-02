const
Debug     = require('@superhero/debug'),
Socket    = require('@superhero/socket'),
log       = new Debug({ debug:true }),
server    = Socket.Server.from(log),
eventMap  =
{
  'subscribe'       : SubscribeObserver,
  'subscribe.once'  : SubscribeOnceObserver,
  'unsubscribe'     : UnsubscribeObserver
}

server.listen(process.env.HTTP_PORT)

for(const listenEvent in observerMap)
  server.on(listenEvent, (context, dto) =>
    Dispatcher.from(context, server, listenEvent, observerMap[key]).dispatch(dto))
