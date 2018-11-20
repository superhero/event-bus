class ContractAvailibilityRequest
{
  /**
   * @param {string} contractId
   * @param {string} commitment
   */
  constructor(contractId, commitment)
  {
    this.contractId = contractId
    this.commitment = commitment

    Object.freeze(this)
  }
}

module.exports = ContractAvailibilityRequest
