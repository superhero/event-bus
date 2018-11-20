class ContractCommitmentRangeError extends RangeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_COMMITMENT_RANGE_ERROR'
  }
}

module.exports = ContractCommitmentRangeError
