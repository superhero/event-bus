const Observer = require('.')

/**
 * Removes a subscription from an observer
 */
class UnsubscribeObserver extends Observer
{
  get errorMessage()
  {
    return 'you must pass the event you like to unsubscribe to as a string'
  }

  valid(event)
  {
    const observer = this.session.fetchObserverByEvent(event)
    observer && this.session.server.removeListener(event, observer)
  }
}

module.exports = UnsubscribeObserver
