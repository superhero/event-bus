class Subscribe
{
  dispatch(session, event)
  {
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
