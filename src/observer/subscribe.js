const Observer = require('.')

/**
 * Subscribes an observer to an event
 */
class SubscribeObserver extends Observer
{
  get errorMessage()
  {
    return 'you must pass the event you like to subscribe to as a string'
  }

  valid(event)
  {
    if(this.session.hasObserverForEvent())
      return

    const observer = (_, dto) => this.session.context.emit(event, dto)
    this.session.setObserverByEvent(event, observer)
    this.session.server.on(event, observer)
  }
}

module.exports = SubscribeObserver
