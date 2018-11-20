class ContractEventNameRangeError extends RangeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_EVENT_NAME_RANGE_ERROR'
  }
}

module.exports = ContractEventNameRangeError
