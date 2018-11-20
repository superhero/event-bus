class ContractEvent
{
  /**
   * @param {string} name
   * @param {string} output
   */
  constructor(name, output)
  {
    this.name   = name
    this.output = output

    Object.freeze(this)
  }
}

module.exports = ContractEvent
