class ContractCommitmentsRangeError extends RangeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_COMMITMENTS_RANGE_ERROR'
  }
}

module.exports = ContractCommitmentsRangeError
