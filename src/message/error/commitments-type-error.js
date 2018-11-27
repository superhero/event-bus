class MessageCommitmentsTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_COMMITMENTS_TYPE_ERROR'
  }
}

module.exports = MessageCommitmentsTypeError
