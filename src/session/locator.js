const Session = require('.')

class SessionLocator
{
  constructor()
  {
    this.sessions = {}
    this.socketAutoIncrementedIndex  = 0
    this.contextAutoIncrementedIndex = 0
  }

  /**
   * @param {@superhero/socket/server} socket
   * @param {@superhero/socket/context} context
   */
  load(socket, context)
  {
    this.loadSocketId(socket)
    this.loadContextId(context)
    const session = this.loadSession(socket, context)

    return session
  }

  /**
   * @protected
   * @param {net.Socket} socket
   */
  loadSocketId(socket)
  {
    return socket.id
    ? socket.id
    : socket.id = ++this.socketAutoIncrementedIndex
  }

  /**
   * @protected
   * @param {@superhero/socket/context} context
   */
  loadContextId(context)
  {
    return context.socket.id
    ? context.socket.id
    : context.socket.id = ++this.contextAutoIncrementedIndex
  }

  /**
   * @protected
   * @param {@superhero/socket/server} socket
   * @param {@superhero/socket/context} context
   */
  loadSession(socket, context)
  {
    const id = `${socket.id}.${context.id}`
    return this.sessions[id]
    ? this.sessions[id]
    : this.sessions[id] = new Session(socket, context)
  }
}

module.exports = SessionLocator
