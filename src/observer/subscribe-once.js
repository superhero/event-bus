class SubscribeOnce
{
  dispatch(session, event)
  {
    if(event in session.observers)
      session.socket.removeListener(event, session.observers[event])

    const observer = (_, dto) =>
    {
      delete session.observers[event]
      session.context.emit(event, dto)
    }
    session.observers[event] = observer
    session.socket.once(event, observer)
  }
}

module.exports = SubscribeOnce
