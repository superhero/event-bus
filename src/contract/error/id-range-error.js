class ContractIdRangeError extends RangeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_ID_RANGE_ERROR'
  }
}

module.exports = ContractIdRangeError
