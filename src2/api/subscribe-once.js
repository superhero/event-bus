/**
 * Subscribes an observer to an event, but only the first time it's casted
 */
class SubscribeOnce
{
  constructor(server)
  {
    this.event  = 'subscribe'
    this.server = server
  }

  dispatch(context, event)
  {
    if(context.listeners)
      context.listeners = {}

    this.session.hasObserverForEvent(event)
    && this.action(context, event)
  }

  action(context, event)
  {
    const observer = (_, dto) =>
    {
      delete this.context.listeners[event]
      this.server.removeObserverByEvent(event)
      this.session.context.emit(event, dto)
    }
    this.session.setObserverByEvent(observer)
    this.session.server.once(event, observer)
  }
}

module.exports = SubscribeOnceObserver
