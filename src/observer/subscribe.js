class Subscribe
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
      session.context.emit('subscribe.error', message)
      return
    }

    // if a subscription already exists for the given event for the given
    // session then remove it.
    // The session can only hold one subscription to an event. If multiple
    // subscriptions to the same event would exist, then it would be impossible
    // to unsubscribe to an event at a later state.
    // If the subscription exists, then replace it with this new form to make
    // it possible to change from "subscribe only once" to "subscribe to all"
    if(event in session.observers)
      session.socket.removeListener(event, session.observers[event])

    const observer = (_, data) => session.context.emit(event, data)
    session.observers[event] = observer
    session.socket.on(event, observer)
  }
}

module.exports = Subscribe
