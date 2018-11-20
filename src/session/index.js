class Session
{
  /**
   * @param {@superhero/socket/server} socket
   * @param {@superhero/socket/context} context
   */
  constructor(socket, context)
  {
    this.observers  = {}
    this.socket     = socket
    this.context    = context
  }
}

module.exports = Session
