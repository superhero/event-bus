class ContractDependencyEventsTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_DEPENDENCY_EVENTS_TYPE_ERROR'
  }
}

module.exports = ContractDependencyEventsTypeError
