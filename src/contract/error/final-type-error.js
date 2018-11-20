class ContractFinalTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_FINAL_TYPE_ERROR'
  }
}

module.exports = ContractFinalTypeError
