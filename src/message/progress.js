const Message = require('.')

class MessageProgress extends Message
{
  /**
   * @param {string} contractId
   * @param {*} output
   * @param {string} commitment
   * @param {boolean} final
   */
  constructor(contractId, output, commitment, final)
  {
    this.contractId   = contractId
    this.output       = output
    this.commitment   = commitment
    this.final        = final

    Object.freeze(this)
  }
}

module.exports = MessageProgress
