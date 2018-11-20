class ContractExecution
{
  /**
   * @param {string} contractId
   * @param {*} input
   * @param {string} commitment
   * @param {Array<ContractEvent>} dependentEvents
   */
  constructor(contractId, input, commitment, dependentEvents)
  {
    this.contractId       = contractId
    this.input            = input
    this.commitment       = commitment
    this.dependentEvents  = dependentEvents

    Object.freeze(this)
  }
}

module.exports = ContractExecution
