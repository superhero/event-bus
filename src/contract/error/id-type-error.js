class ContractIdTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_ID_TYPE_ERROR'
  }
}

module.exports = ContractIdTypeError
