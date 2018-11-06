class Server
{
  constructor(socketServer, sessionLocator)
  {
    this.socket         = socketServer
    this.sessionLocator = sessionLocator
  }

  listen(port)
  {
    this.socket.listen(port)
  }

  attachObserver(event, observer)
  {
    this.socket.on(event, (context, data) =>
    {
      if(typeof data !== 'string')
      {
        const session = this.sessionLocator.load(this.socket, context)
        observer.dispatch(session, data)
      }
      else
      {
        const message = 'you must pass the data as an event in form of a string'
        context.emit(`${event}.error`, message)
      }
    })
  }
}

module.exports = Server
