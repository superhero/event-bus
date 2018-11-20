class Unsubscribe
{
  /**
   * @param {Session} session
   * @param {string} event
   */
  dispatch(session, event)
  {
    if(typeof data !== 'string')
    {
      const message = 'you must pass the data as an event in form of a string'
      session.context.emit('unsubscribe.error', message)
      return
    }

    const observer = session.observers[event]
    observer && session.socket.removeListener(event, observer)
    delete session.observers[event]
  }
}

module.exports = Unsubscribe
