const
Server  = require('.'),
socket  = require('@superhero/socket'),
Debug   = require('@superhero/debug')

class ServerFactory
{
  constructor(sessionLocator)
  {
    this.sessionLocator = sessionLocator
  }

  create()
  {
    const
    log           = new Debug({ debug:true }),
    socketServer  = socket.createServer(log),
    server        = new Server(socketServer, this.sessionLocator)

    return server
  }
}

module.exports = ServerFactory
