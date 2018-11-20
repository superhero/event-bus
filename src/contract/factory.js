const
Contract                      = require('.'),
ContractValidator             = require('./validator'),
ContractConfirmation          = require('./confirmation'),
ContractAvailibilityRequest   = require('./availibility-request'),
ContractAvailibilityResponse  = require('./availibility-response'),
ContractEvent                 = require('./event'),
ContractExecution             = require('./execution'),
ContractProgress              = require('./progress')

class ContractFactory
{
  constructor()
  {
    this.contractValidator = this.createValidator()
  }

  /**
   * @returns {ContractValidator}
   */
  createValidator()
  {
    return new ContractValidator
  }

  /**
   * @param {string} id
   * @param {string} name
   * @param {*} input
   * @param {Array<string>} commitments
   * @returns {Contract}
   */
  createContract(id, name, input, commitments)
  {
    this.contractValidator.validateContract(id, name, input, commitments)
    return new Contract(id, name, input, commitments)
  }

  /**
   * @param {string} id
   * @param {string} name
   * @returns {ContractConfirmation}
   */
  createConfirmation(id, name)
  {
    this.contractValidator.validateConfirmation(id, name)
    return new ContractConfirmation(id, name)
  }

  /**
   * @param {string} contractId
   * @param {string} commitment
   */
  createAvailibilityRequest(contractId, commitment)
  {
    this.contractValidator.validateAvailibilityRequest(contractId, commitment)
    return new ContractAvailibilityRequest(contractId, commitment)
  }

  /**
   * @param {string} contractId
   * @param {string} commitment
   * @param {boolean} requiresInput
   * @param {Array<string>} dependencyEvents
   */
  createAvailibilityResponse(contractId, commitment, requiresInput, dependencyEvents)
  {
    this.contractValidator.validateAvailibilityResponse(contractId, commitment, requiresInput, dependenyEvents)
    return new ContractAvailibilityResponse(contractId, commitment, requiresInput, dependenyEvents)
  }

  /**
   * @param {string} name
   * @param {*} output
   */
  createEvent(name, output)
  {
    this.contractValidator.validateEvent(name, output)
    return new ContractEvent(name, output)
  }

  /**
   * @param {string} contractId
   * @param {*} input
   * @param {string} commitment
   * @param {Array<CommitmentEvent>} dependentEvents
   */
  createExecution(contractId, input, commitment, dependentEvents)
  {
    this.contractValidator.validateExecution(contractId, input, commitment, dependentEvents)
    return new ContractExecution(contractId, input, commitment, dependentEvents)
  }

  /**
   * @param {string} contractId
   * @param {*} output
   * @param {string} commitment
   * @param {boolean} final
   */
  createProgress(contractId, output, commitment, final)
  {
    this.contractValidator.validateProgress(contractId, output, commitment, final)
    return new ContractProgress(contractId, output, commitment, final)
  }
}

module.exports = ContractFactory
