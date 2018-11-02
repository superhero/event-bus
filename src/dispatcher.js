const Session = require('./session')

class Dispatcher
{
  static from(context, server, listenEvent, Observer)
  {
    const
    session     = new Session(context, server),
    observer    = new Observer(session, listenEvent),
    dispatcher  = new Dispatcher(observer)

    return dispatcher
  }

  /**
   * @param {Observer} observer
   */
  constructor(observer)
  {
    this.observer = observer
  }

  dispatch(dispatchEvent)
  {
    typeof dispatchEvent === 'string'
    ? this.observer.valid(dispatchEvent)
    : this.observer.emitListenErrorMessage()
  }
}

module.exports = Dispatcher
