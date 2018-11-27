const Message = require('.')

class MessageConfirmation extends Message
{
  /**
   * @param {string} contractId
   */
  constructor(contractId)
  {
    this.contractId = contractId
    Object.freeze(this)
  }
}

module.exports = MessageConfirmation
