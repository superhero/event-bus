class ContractEventNameTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_EVENT_NAME_TYPE_ERROR'
  }
}

module.exports = ContractEventNameTypeError
