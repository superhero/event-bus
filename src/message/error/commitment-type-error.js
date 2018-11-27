class MessageCommitmentTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'ERR_COMMITMENT_TYPE_ERROR'
  }
}

module.exports = MessageCommitmentTypeError
