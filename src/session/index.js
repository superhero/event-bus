class Session
{
  constructor(socket, context)
  {
    this.observers  = {}
    this.socket     = socket
    this.context    = context
  }
}

module.exports = Session
