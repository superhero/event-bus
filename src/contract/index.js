class Contract
{
  /**
   * @param {string} id
   * @param {string} name
   * @param {*} input
   * @param {Array<string>} commitments
   */
  constructor(id, name, input, commitments)
  {
    this.id           = id
    this.name         = name
    this.input        = input
    this.commitments  = commitments

    Object.freeze(this)
  }
}

module.exports = Contract
