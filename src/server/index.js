class Server
{
  /**
   * @param {@superhero/socket/server} socket
   * @param {SessionLocator} sessionLocator
   */
  constructor(socket, sessionLocator)
  {
    this.socket         = socket
    this.sessionLocator = sessionLocator
  }

  /**
   * @param {number} port
   */
  listen(port)
  {
    this.socket.listen(port)
  }

  /**
   * @param {string} event
   * @param {Observer} observer
   */
  attachObserver(event, observer)
  {
    this.socket.on(event, (context, data) =>
    {
      const session = this.sessionLocator.load(this.socket, context)
      observer.dispatch(session, data)
    })
  }
}

module.exports = Server
