class ContractAvailibilityResponse
{
  /**
   * @param {string} contractId
   * @param {string} commitment
   * @param {boolean} requiresInput
   * @param {Array<string>} dependenyEvents
   */
  constructor(contractId, commitment, requiresInput, dependenyEvents)
  {
    this.contractId       = contractId
    this.commitment       = commitment
    this.requiresInput    = requiresInput
    this.dependenyEvents  = dependenyEvents

    Object.freeze(this)
  }
}

module.exports = ContractAvailibilityResponse
