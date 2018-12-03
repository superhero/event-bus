const
MessageIdTypeError            = require('./error/id-type-error'),
MessageIdRangeError           = require('./error/id-range-error'),
MessageNameTypeError          = require('./error/name-type-error'),
MessageNameRangeError         = require('./error/name-range-error'),
MessageDependenciesTypeError  = require('./error/dependencies-type-error'),
MessageCommitmentsTypeError   = require('./error/commitments-type-error'),
MessageCommitmentsRangeError  = require('./error/commitments-range-error'),
MessageCommitmentTypeError    = require('./error/commitment-type-error'),
MessageCommitmentRangeError   = require('./error/commitment-range-error'),
MessageFinalTypeError         = require('./error/final-type-error')

class MessageValidator
{
  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   * @throws {MessageNameTypeError}
   * @throws {MessageNameRangeError}
   * @throws {MessageCommitmentsTypeError}
   * @throws {MessageCommitmentsRangeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateContract(id, name, input, commitments, confirmed)
  {
    this.validateId(id)
    this.validateContractName(name)
    this.validateInput(input)
    this.validateCommitments(commitments)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   */
  validateConfirmation(id)
  {
    this.validateId(id)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   */
  validateCompleted(id)
  {
    this.validateId(id)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   * @throws {MessageCommitmentsTypeError}
   * @throws {MessageCommitmentsRangeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateAvailibilityRequest(contractId, commitment)
  {
    this.validateId(contractId)
    this.validateCommitment(commitment)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   * @throws {MessageDependenciesTypeError}
   */
  validateAvailibilityResponse(contractId, executionId, commitment, dependencies)
  {
    this.validateId(contractId)
    this.validateId(executionId)
    this.validateCommitment(commitment)
    this.validateDependencies(dependencies)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateExecution(contractId, input, commitment)
  {
    this.validateId(contractId)
    this.validateInput(input)
    this.validateCommitment(commitment)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   * @throws {MessageFinalTypeError}
   * @throws {MessageFinalTypeError}
   */
  validateProgress(contractId, output, commitment, final)
  {
    this.validateId(contractId)
    this.validateOutput(output)
    this.validateCommitment(commitment)
    this.validateFinal(final)
  }

  /**
   * @throws {MessageIdTypeError}
   * @throws {MessageIdRangeError}
   */
  validateId(id)
  {
    if(typeof id !== 'string')
      throw new MessageIdTypeError('id must be a string')

    if(id.length === 0)
      throw new MessageIdRangeError('id can not be empty')
  }

  /**
   * @throws {MessageNameTypeError}
   * @throws {MessageNameRangeError}
   */
  validateContractName(name)
  {
    if(typeof name !== 'string')
      throw new MessageNameTypeError('name must be a string')

    if(name.length === 0)
      throw new MessageNameRangeError('name can not be empty')
  }

  /**
   */
  validateInput(input)
  {
    // input can be anything...
  }

  /**
   * @throws {MessageCommitmentsTypeError}
   * @throws {MessageCommitmentsRangeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateCommitments(commitments)
  {
    if(typeof commitments !== 'object')
      throw new MessageCommitmentsTypeError('commitments must be an object')

    if(Array.isArray(commitments))
      throw new MessageCommitmentsTypeError('commitments must not be an array')

    if(commitments === null)
      throw new MessageCommitmentsTypeError('commitments must not be null')

    if(Object.keys(commitments).length === 0)
      throw new MessageCommitmentsRangeError('commitments must contain at least 1 item')

    for(const commitment in commitments)
    {
      if(!Array.isArray(commitments[commitment]))
        throw new MessageCommitmentsTypeError('commitments must be a plain structure of arrays')

      this.validateCommitment(commitment)
    }
  }

  /**
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateCommitment(commitment)
  {
    if(typeof commitment !== 'string')
      throw new MessageCommitmentTypeError('commitment must be a string')

    if(commitment.length === 0)
      throw new MessageCommitmentRangeError('commitment can not be empty')
  }

  /**
   * @throws {MessageFinalTypeError}
   */
  validateFinal(final)
  {
    if(typeof final === 'boolean')
      throw new MessageFinalTypeError('"final" must be a boolean')
  }

  /**
   * @throws {MessageDependenciesTypeError}
   * @throws {MessageCommitmentTypeError}
   * @throws {MessageCommitmentRangeError}
   */
  validateDependencies(dependencies)
  {
    if(!Array.isArray(events))
      throw new MessageDependenciesTypeError('dependencies must be an array')

    events.forEach(this.validateCommitment.bind(this))
  }

  /**
   * output could be of any type and value, or none...
   */
  validateOutput(output)
  {
    // could be anything...
  }
}

module.exports = MessageValidator
