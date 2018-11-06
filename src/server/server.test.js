describe('Server', () =>
{
  const expect = require('chai').expect

  it('is possible to create a server', () =>
  {
    const
    Server          = require('.'),
    SessionLocator  = require('../session/locator'),
    sessionLocator  = new SessionLocator,
    ServerFactory   = require('./factory'),
    serverFactory   = new ServerFactory(sessionLocator),
    server          = serverFactory.create()

    expect(server).to.be.an.instanceof(Server)
  })
})
