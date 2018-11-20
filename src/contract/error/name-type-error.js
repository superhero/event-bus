class ContractNameTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_NAME_TYPE_ERROR'
  }
}

module.exports = ContractNameTypeError
