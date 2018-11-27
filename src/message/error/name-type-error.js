class MessageNameTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_NAME_TYPE_ERROR'
  }
}

module.exports = MessageNameTypeError
