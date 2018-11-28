class ContractPublisher
{
  constructor(redisClient, messageFactory)
  {
    this.redis          = redisClient
    this.messageFactory = messageFactory
  }

  /**
   */
  async publish(name, input, commitments)
  {
    const
    contractId          = this.createContractId(),
    contract            = this.messageFactory.createContract(contractId, name, input, commitments),
    contractChannel     = `${contractId}.confirmation`,
    serializedContract  = contract.serialize()

    await this.redis.do('PUBLISH', contractChannel, serializedContract)

    contract.confirmed = true
  }

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
