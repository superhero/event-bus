class ContractDependencyEventsRangeError extends RangeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_DEPENDENCY_EVENTS_RANGE_ERROR'
  }
}

module.exports = ContractDependencyEventsRangeError
