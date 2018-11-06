describe('Session', () =>
{
  const expect = require('chai').expect

  it('is possible to lazy load a session', () =>
  {
    const
    Session         = require('.'),
    SessionLocator  = require('./locator'),
    sessionLocator  = new SessionLocator,
    socket          = {},
    context         = {}

    let session = sessionLocator.load(socket, context)
    expect(session).to.be.an.instanceof(Session)
    session = sessionLocator.load(socket, context)
    expect(session).to.deep.equal(session)
  })
})
