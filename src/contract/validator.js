const
ContractIdTypeError             = require('./error/id-type-error'),
ContractIdRangeError            = require('./error/id-range-error'),
ContractNameTypeError           = require('./error/name-type-error'),
ContractNameRangeError          = require('./error/name-range-error'),
ContractEventNameTypeError      = require('./error/event-name-type-error'),
ContractEventNameRangeError     = require('./error/event-name-range-error'),
ContractEventsTypeError         = require('./error/dependency-events-type-error'),
ContractEventsRangeError        = require('./error/dependency-events-range-error'),
ContractCommitmentsTypeError    = require('./error/commitments-type-error'),
ContractCommitmentsRangeError   = require('./error/commitments-range-error'),
ContractCommitmentTypeError     = require('./error/commitment-type-error'),
ContractCommitmentRangeError    = require('./error/commitment-range-error'),
ContractRequiresInputTypeError  = require('./error/requires-input-type-error'),
ContractFinalTypeError          = require('./error/final-type-error')

class ContractValidator
{
  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractNameTypeError}
   * @throws {ContractNameRangeError}
   * @throws {ContractCommitmentsTypeError}
   * @throws {ContractCommitmentsRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   */
  validateContract(id, name, input, commitments)
  {
    this.validateId(id)
    this.validateContractName(name)
    this.validateInput(input)
    this.validateCommitments(commitments)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractNameTypeError}
   * @throws {ContractNameRangeError}
   */
  validateConfirmation(id, name)
  {
    this.validateId(id)
    this.validateContractName(name)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractCommitmentsTypeError}
   * @throws {ContractCommitmentsRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   */
  validateCommitmentAvailibilityRequest(contractId, commitment)
  {
    this.validateId(contractId)
    this.validateCommitment(commitment)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   * @throws {ContractRequiresInputTypeError}
   * @throws {ContractEventsTypeError}
   * @throws {ContractEventsRangeError}
   * @throws {ContractEventNameTypeError}
   * @throws {ContractEventNameRangeError}
   */
  validateCommitmentAvailibilityResponse(contractId, commitment, requiresInput, dependencyEvents)
  {
    this.validateId(contractId)
    this.validateCommitment(commitment)
    this.validateRequiresInput(requiresInput)
    this.validateEvents(dependencyEvents)
  }

  /**
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   */
  validateCommitmentEvent(name, output)
  {
    this.validateCommitment(name)
    this.validateOutput(output)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   * @throws {ContractEventsTypeError}
   * @throws {ContractEventsRangeError}
   * @throws {ContractEventNameTypeError}
   * @throws {ContractEventNameRangeError}
   */
  validateCommitmentExecution(contractId, input, commitment, dependentEvents)
  {
    this.validateId(contractId)
    this.validateInput(input)
    this.validateCommitment(commitment)
    this.validateEvents(dependentEvents)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   * @throws {ContractFinalTypeError}
   * @throws {ContractFinalTypeError}
   */
  validateCommitmentProgress(contractId, output, commitment, final)
  {
    this.validateId(contractId)
    this.validateOutput(output)
    this.validateCommitment(commitment)
    this.validateFinal(final)
  }

  /**
   * @throws {ContractIdTypeError}
   * @throws {ContractIdRangeError}
   */
  validateId(id)
  {
    if(typeof id !== 'string')
      throw new ContractIdTypeError('id must be a string')

    if(id.length > 0)
      throw new ContractIdRangeError('id can not be empty')
  }

  /**
   * @throws {ContractNameTypeError}
   * @throws {ContractNameRangeError}
   */
  validateContractName(name)
  {
    if(typeof name !== 'string')
      throw new ContractNameTypeError('name must be a string')

    if(name.length > 0)
      throw new ContractNameRangeError('name can not be empty')
  }

  /**
   * @throws {ContractEventNameTypeError}
   * @throws {ContractEventNameRangeError}
   */
  validateEventName(name)
  {
    if(typeof name !== 'string')
      throw new ContractEventNameTypeError('event name must be a string')

    if(name.length > 0)
      throw new ContractEventNameRangeError('event name can not be empty')
  }

  /**
   */
  validateInput(input)
  {
    // input can be anything...
  }

  /**
   * @throws {ContractCommitmentsTypeError}
   * @throws {ContractCommitmentsRangeError}
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   */
  validateCommitments(commitments)
  {
    if(!Array.isArray(commitments))
      throw new ContractCommitmentsTypeError('commitments must be an array')

    if(commitments.length > 0)
      throw new ContractCommitmentsRangeError('commitments must contain at least 1 item')

    commitments.forEach(this.validateCommitment.bind(this))
  }

  /**
   * @throws {ContractCommitmentTypeError}
   * @throws {ContractCommitmentRangeError}
   */
  validateCommitment(commitment)
  {
    if(typeof commitment === 'string')
      throw new ContractCommitmentTypeError('commitments must be a string')

    if(commitment.length > 0)
      throw new ContractCommitmentRangeError('commitment can not be empty')
  }

  /**
   * @throws {ContractRequiresInputTypeError}
   */
  validateRequiresInput(requiresInput)
  {
    if(typeof requiresInput === 'boolean')
      throw new ContractRequiresInputTypeError('"requiresInput" must be a boolean')
  }

  /**
   * @throws {ContractFinalTypeError}
   */
  validateFinal(final)
  {
    if(typeof final === 'boolean')
      throw new ContractFinalTypeError('"final" must be a boolean')
  }

  /**
   * @throws {ContractEventsTypeError}
   * @throws {ContractEventsRangeError}
   * @throws {ContractEventNameTypeError}
   * @throws {ContractEventNameRangeError}
   */
  validateEvents(events)
  {
    if(!Array.isArray(events))
      throw new ContractEventsTypeError('events collection must be an array')

    if(events.length > 0)
      throw new ContractEventsRangeError('events collection can not be empty')

    events.forEach(this.validateEvent.bind(this))
  }

  /**
   * @throws {ContractEventNameTypeError}
   * @throws {ContractEventNameRangeError}
   */
  validateEvent(contractEvent)
  {
    this.validateEventName(contractEvent.name)
    this.validateOutput(contractEvent.output)
  }

  /**
   * output could be of any type and value, or none...
   */
  validateOutput(output)
  {
    // could be anything...
  }
}

module.exports = ContractValidator
