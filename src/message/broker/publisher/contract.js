class ContractPublisher
{
  /**
   * @param {RedisPublisher} redisPublisher
   * @param {MessageFactory} messageFactory
   */
  constructor(redisPublisher, messageFactory)
  {
    this.redisPublisher = redisPublisher
    this.messageFactory = messageFactory
  }

  /**
   * @param {string} name
   * @param {*} input
   * @param {Array<string>} commitments
   */
  publish(name, input, commitments)
  {
    const
    contractId          = this.createContractId(),
    contract            = this.messageFactory.createContract(contractId, name, input, commitments),
    contractChannel     = `contract`,
    serializedContract  = contract.serialize()

    this.redisPublisher.publish(contractChannel, serializedContract)

    contract.confirmed = true
  }

  /**
   * @returns {string}
   */
  createContractId()
  {
    const
    timestamp = Date.now().toString(36),
    random    = Math.random().toString(36).substr(2),
    id        = `${timestamp}-${random}`

    return id
  }
}

module.exports = ContractPublisher
