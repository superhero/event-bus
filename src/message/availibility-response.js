const Message = require('.')

class MessageAvailibilityResponse extends Message
{
  /**
   * @param {string} contractId
   * @param {string} executionId
   * @param {string} commitment
   * @param {Array<string>} dependencies
   */
  constructor(contractId, executionId, commitment, dependencies)
  {
    super()

    this.contractId   = contractId
    this.executionId  = executionId
    this.commitment   = commitment
    this.dependencies = dependencies

    Object.freeze(this)
  }
}

module.exports = MessageAvailibilityResponse
