class Unsubscribe
{
  dispatch(session, event)
  {
    const observer = session.observers[event]
    observer && session.socket.removeListener(event, observer)
    delete session.observers[event]
  }
}

module.exports = Unsubscribe
