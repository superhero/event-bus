class Session
{
  /**
   * @param {Context} context
   * @param {net.Server} server
   */
  constructor(context, server)
  {
    if(!context.listeners)
      context.listeners = {}

    this.context = context
    this.server  = server
  }

  /**
   * @param {string} event
   */
  hasObserverForEvent(event)
  {
    return !! this.fetchObserverByEvent(event)
  }

  /**
   * @param {string} event
   */
  fetchObserverByEvent(event)
  {
    return this.context.listeners[event]
  }

  /**
   * @param {string} event
   * @param {function} observer
   */
  setObserverByEvent(event, observer)
  {
    this.context.listeners[event] = observer
    const onClose = () => this.server.removeListener(event, observer)
    this.context.socket.on('close', onClose)
  }

  /**
   * @param {string} event
   */
  removeObserverByEvent(event)
  {
    delete this.context.listeners[event]
  }
}

module.exports = Session
