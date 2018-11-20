class ContractConfirmation
{
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name)
  {
    this.id   = id
    this.name = name

    Object.freeze(this)
  }
}

module.exports = ContractConfirmation
