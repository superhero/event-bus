const Message = require('.')

class MessageAvailibilityResponse extends Message
{
  /**
   * @param {string} contractId
   * @param {string} executionId
   * @param {string} commitment
   * @param {Array<string>} dependenyEvents
   */
  constructor(contractId, executionId, commitment, dependenyEvents)
  {
    super()

    this.contractId       = contractId
    this.executionId      = executionId
    this.commitment       = commitment
    this.dependenyEvents  = dependenyEvents

    Object.freeze(this)
  }
}

module.exports = MessageAvailibilityResponse
