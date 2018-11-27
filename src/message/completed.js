const Message = require('.')

class MessageCompleted extends Message
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

module.exports = MessageCompleted
