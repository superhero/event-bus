const Message = require('.')

class MessageContract extends Message
{
  /**
   * @param {string} id
   * @param {string} name
   * @param {*} input
   * @param {Object} commitments
   */
  constructor(id, name, input, commitments)
  {
    super()

    this.id           = id
    this.name         = name
    this.input        = input
    this.commitments  = commitments
  }
}

module.exports = MessageContract
