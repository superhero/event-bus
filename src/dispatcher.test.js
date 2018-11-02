describe('Dispatcher', () =>
{
  const expect = require('chai').expect

  it('create a dispatcher through its factory', () =>
  {
    const
    net         = require('net'),
    socket      = new net.Socket,
    server      = new net.Server,
    context     = { socket },
    Observer    = require('./observer'),
    Dispatcher  = require('./dispatcher'),
    dispatcher  = Dispatcher.from(context, server, Observer)

    expect(dispatcher).to.be.an.instanceof(Dispatcher)
  })

  it('dispatching calls valid method in the observer', (done) =>
  {
    const
    net         = require('net'),
    socket      = new net.Socket,
    server      = new net.Server,
    context     = { socket },
    Observer    = require('./observer'),
    Dispatcher  = require('./dispatcher'),
    TmpObserver = class extends Observer
    {
      valid(event)
      {
        done()
      }
    },
    dispatcher = Dispatcher.from(context, server, TmpObserver)

    dispatcher.dispatch('foo')
  })

  it('fails if ', (done) =>
  {
    const
    Events      = require('events'),
    events      = new Events,
    net         = require('net'),
    socket      = new net.Socket,
    server      = new net.Server,
    context     = { socket, emit:events.emit.bind(events) },
    Observer    = require('./observer'),
    Dispatcher  = require('./dispatcher'),
    TmpObserver = class extends Observer
    {
      get errorMessage()
      {
        return 'temp error'
      }
    },
    dispatcher = Dispatcher.from(context, server, TmpObserver)

    events.on()

    dispatcher.dispatch({ event:'foobar' })
  })
})
