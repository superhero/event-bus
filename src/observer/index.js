class Observer
{
  /**
   * @param {Session} session
   */
  constructor(session, listenEvent)
  {
    this.session      = session
    this.listenEvent  = listenEvent
  }

  /**
   * @abstract
   */
  get event()
  {
    throw Error('abstract member reference "errorEvent"')
  }

  /**
   * @abstract
   */
  get errorMessage()
  {
    throw Error('abstract member reference "errorMessage"')
  }

  /**
   * @abstract
   */
  valid(dispatchEvent)
  {
    throw Error('abstract member reference "valid"')
  }

  emitListenErrorMessage()
  {
    this.session.context.emit(`${this.listenEvent}.error`, this.errorMessage)
  }
}

module.exports = Observer
