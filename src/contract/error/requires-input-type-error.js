class ContractRequiresInputTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_REQUIRES_INPUT_TYPE_ERROR'
  }
}

module.exports = ContractRequiresInputTypeError
