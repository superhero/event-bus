describe('Session', () =>
{
  const expect = require('chai').expect

  it('can add, fetch, remove and check if there is an observer to a certain events', () =>
  {
    const
    net       = require('net'),
    socket    = new net.Socket,
    server    = new net.Server,
    context   = { socket },
    Session   = require('./session'),
    session   = new Session(context, server),
    event     = 'foo',
    observer  = () => 'bar'

    session.setObserverByEvent(event, observer)

    expect(session.hasObserverForEvent(event)).to.be.equal(true)
    expect(session.fetchObserverByEvent(event)).to.deep.equal(observer)

    session.removeObserverByEvent(event)

    expect(session.hasObserverForEvent(event)).to.be.equal(false)
  })
})
