/**
 * Subscribes an observer to an event
 */
class Subscribe
{
  constructor(server)
  {
    this.event  = 'subscribe'
    this.server = server
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
