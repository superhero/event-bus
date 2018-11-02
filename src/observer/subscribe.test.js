describe('Observer/Subscribe', () =>
{
  const expect = require('chai').expect

  it('error message', () =>
  {
    const
    net       = require('net'),
    socket    = new net.Socket,
    server    = new net.Server,
    context   = { socket },
    Session   = require('../session'),
    session   = new Session(context, server),
    Subscribe = require('./subscribe'),
    subscribe = new Subscribe(session)

    expect(() => subscribe.errorMessage).to.not.throw()
  })

  it('integration test', (done) =>
  {
    const
    Debug       = require('@superhero/debug'),
    Socket      = require('@superhero/socket'),
    log         = new Debug({ debug:false }),
    server      = Socket.Server.from(log),
    client      = Socket.Client.from(log),
    Dispatcher  = require('../dispatcher'),
    Subscribe   = require('./subscribe'),
    port        = 18200,
    event       = 'foobar',
    body        = { foo:'bar' }

    server.listen(port)
    client.connect(port)
    client.emit('subscribe', event)

    server.on('subscribe', (context) =>
    {
      Dispatcher.from(context, server, Subscribe).dispatch(event)
      client.emit(event, body)
    })

    client.on(event, (_, dto) =>
    {
      expect(dto).to.be.deep.equal(body)
      client.client.end()
      server.server.close()
      done()
    })
  })
})
