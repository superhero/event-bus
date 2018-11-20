class ContractObserver
{
  constructor(contractFactory)
  {
    this.contractFactory = contractFactory
  }

  /**
   * @param {Session} session
   * @param {Object} dto
   */
  dispatch(session, dto)
  {
    const contract = this.contractFactory.createContract(dto.id, dto.name, dto.input, dto.commitments)
    for(const commitment of contract.commitments)
    {
      const availibilityRequest = this.contractFactory.createAvailibilityRequest(contract.id, commitment)
      session.socket.emit(availibilityRequest)
    }
  }
}

module.exports = ContractObserver
