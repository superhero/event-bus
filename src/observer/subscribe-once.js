const Observer = require('.')

/**
 * Subscribes an observer to an event, but only the first time it's casted
 */
class SubscribeOnceObserver extends Observer
{
  get errorMessage()
  {
    return 'you must pass the event you like to subscribe to once as a string'
  }

  valid(event)
  {
    if(this.session.hasObserverForEvent(event))
      return

    const observer = (_, dto) =>
    {
      this.session.removeObserverByEvent(event)
      this.session.context.emit(event, dto)
    }
    this.session.setObserverByEvent(observer)
    this.session.server.once(event, observer)
  }
}

module.exports = SubscribeOnceObserver
