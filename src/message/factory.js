const
MessageContract             = require('./contract'),
MessageValidator            = require('./validator'),
MessageConfirmation         = require('./confirmation'),
MessageCompleted            = require('./completed'),
MessageAvailibilityRequest  = require('./availibility-request'),
MessageAvailibilityResponse = require('./availibility-response'),
MessageExecution            = require('./execution'),
MessageProgress             = require('./progress')

class MessageFactory
{
  constructor()
  {
    this.messageValidator = this.createValidator()
  }

  /**
   * @returns {MessageValidator}
   */
  createValidator()
  {
    return new MessageValidator
  }

  /**
   * @param {string} id
   * @param {string} name
   * @param {*} input
   * @param {Object} commitments
   *
   * @returns {MessageContract}
   */
  createContract(id, name, input, commitments)
  {
    this.messageValidator.validateContract(id, name, input, commitments)
    return new MessageContract(id, name, input, commitments)
  }

  /**
   * @param {string} message serialized contract message
   */
  createContractFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createContract(
      structor.id,
      structor.name,
      structor.input,
      structor.commitments)
  }

  /**
   * @param {string} id
   *
   * @returns {MessageConfirmation}
   */
  createConfirmation(id)
  {
    this.messageValidator.validateConfirmation(id)
    return new MessageConfirmation(id)
  }

  /**
   * @param {string} message serialized availibility request message
   */
  createConfirmationFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createConfirmation(structor.contractId)
  }

  /**
   * @param {string} id
   *
   * @returns {MessageCompleted}
   */
  createCompleted(id)
  {
    this.messageValidator.validateCompleted(id)
    return new MessageCompleted(id)
  }

  /**
   * @param {string} message serialized availibility request message
   */
  createCompletedFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createCompleted(structor.contractId)
  }

  /**
   * @param {string} contractId
   * @param {string} commitment
   */
  createAvailibilityRequest(contractId, commitment)
  {
    this.messageValidator.validateAvailibilityRequest(contractId, commitment)
    return new MessageAvailibilityRequest(contractId, commitment)
  }

  /**
   * @param {string} message serialized availibility request message
   */
  createAvailibilityRequestFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createAvailibilityRequest(
      structor.contractId,
      structor.commitment)
  }

  /**
   * @param {string} contractId
   * @param {string} executionId
   * @param {string} commitment
   * @param {Array<string>} dependencies
   */
  createAvailibilityResponse(contractId, executionId, commitment, dependencies)
  {
    this.messageValidator.validateAvailibilityResponse(contractId, executionId, commitment, dependencies)
    return new MessageAvailibilityResponse(contractId, executionId, commitment, dependencies)
  }

  /**
   * @param {string} message serialized availibility response message
   */
  createAvailibilityResponseFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createAvailibilityResponse(
      structor.contractId,
      structor.executionId,
      structor.commitment,
      structor.dependencies)
  }

  /**
   * @param {string} contractId
   * @param {*} input
   * @param {string} commitment
   */
  createExecution(contractId, input, commitment)
  {
    this.messageValidator.validateExecution(contractId, input, commitment)
    return new MessageExecution(contractId, input, commitment)
  }

  /**
   * @param {string} message serialized availibility response message
   */
  createExecutionFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createExecution(
      structor.contractId,
      structor.input,
      structor.commitment)
  }

  /**
   * @param {string} contractId
   * @param {*} output
   * @param {string} commitment
   * @param {boolean} final
   */
  createProgress(contractId, output, commitment, final)
  {
    this.messageValidator.validateProgress(contractId, output, commitment, final)
    return new MessageProgress(contractId, output, commitment, final)
  }

  /**
   * @param {string} message serialized progress message
   */
  createProgressFromSerialized(message)
  {
    const structor = JSON.parse(message)
    return this.createProgress(
      structor.contractId,
      structor.output,
      structor.commitment,
      structor.final)
  }
}

module.exports = MessageFactory
