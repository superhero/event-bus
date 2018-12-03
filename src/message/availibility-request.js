const Message = require('.')

class MessageAvailibilityRequest extends Message
{
  /**
   * @param {string} contractId
   * @param {string} commitment
   */
  constructor(contractId, commitment)
  {
    super()

    this.contractId = contractId
    this.commitment = commitment

    Object.freeze(this)
  }
}

module.exports = MessageAvailibilityRequest
