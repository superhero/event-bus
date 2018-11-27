class MessageDependenciesTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_DEPENDENCIES_TYPE_ERROR'
  }
}

module.exports = MessageDependenciesTypeError
