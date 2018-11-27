const Message = require('.')

class MessageExecution extends Message
{
  /**
   * @param {string} contractId
   * @param {*} input
   * @param {string} commitment
   */
  constructor(contractId, input, commitment)
  {
    this.contractId = contractId
    this.input      = input
    this.commitment = commitment

    Object.freeze(this)
  }
}

module.exports = MessageExecution
