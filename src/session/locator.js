const Session = require('.')

class SessionLocator
{
  constructor()
  {
    this.sessions = {}
    this.socketAutoIncrementedIndex  = 0
    this.contextAutoIncrementedIndex = 0
  }

  load(socket, context)
  {
    this.loadSocketId(socket)
    this.loadContextId(context)
    const session = this.loadSession(socket, context)

    return session
  }

  /**
   * @protected
   */
  loadSocketId(socket)
  {
    return socket.id
    ? socket.id
    : socket.id = this.socketAutoIncrementedIndex++
  }

  /**
   * @protected
   */
  loadContextId(context)
  {
    return context.id
    ? context.id
    : context.id = this.contextAutoIncrementedIndex++
  }

  /**
   * @protected
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
