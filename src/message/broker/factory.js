const
MessageBroker                   = require('.'),
// dispatchers
AvailibilityResponseDispatcher  = require('./dispatcher/availibility-response'),
CompletedDispatcher             = require('./dispatcher/completed'),
ContractDispatcher              = require('./dispatcher/contract'),
ConfirmationDispatcher          = require('./dispatcher/confirmation'),
ProgressDispatcher              = require('./dispatcher/progress'),
// publishers
AvailibilityRequestPublisher    = require('./publisher/availibility-request'),
AvailibilityResponsePublisher   = require('./publisher/availibility-response'),
CompletedPublisher              = require('./publisher/completed'),
ConfirmationPublisher           = require('./publisher/confirmation'),
ContractPublisher               = require('./publisher/contract'),
ExecutionPublisher              = require('./publisher/execution'),
ProgressTransmitterPublisher    = require('./publisher/progress-transmitter'),
ProgressPublisher               = require('./publisher/progress'),
// subscribers
AvailibilityRequestSubscriber   = require('./subscriber/availibility-request'),
ContractSubscriber              = require('./subscriber/contract')

class MessageBrokerFactory
{
  /**
   * @param {MessageFactory} messageFactory
   * @param {Events} events
   * @param {RedisPublisher} redisPublisher
   * @param {RedisSubscriber} redisSubscriber
   */
  constructor(messageFactory, events, redisPublisher, redisSubscriber)
  {
    this.messageFactory   = messageFactory
    this.events           = events
    this.redisPublisher   = redisPublisher
    this.redisSubscriber  = redisSubscriber
  }

  /**
   * @returns {MessageBroker}
   */
  createMessageBroker()
  {
    const
    availibilityRequestSubscriber = this.createAvailibilityRequestSubscriber(),
    progressPublisher             = this.createProgressPublisher(),
    contractPublisher             = this.createContractPublisher(),
    contractSubscriber            = this.createContractSubscriber()

    return new MessageBroker(availibilityRequestSubscriber, progressPublisher,
      contractPublisher, contractSubscriber)
  }

  /**
   * @returns {ContractDispatcher}
   */
  createContractDispatcher()
  {
    const
    availibilityRequestPublisher    = this.createAvailibilityRequestPublisher(),
    availibilityResponseDispatcher  = this.createAvailibilityResponseDispatcher(),
    progressDispatcher              = this.createProgressDispatcher(),
    completedDispatcher             = this.createCompletedDispatcher()

    return new ContractDispatcher(this.redisSubscriber, this.messageFactory,
      this.events, availibilityRequestPublisher, availibilityResponseDispatcher,
      progressDispatcher, completedDispatcher)
  }

  /**
   * @returns {ConfirmationDispatcher}
   */
  createConfirmationDispatcher()
  {
    return new ConfirmationDispatcher(this.messageFactory)
  }

  /**
   * @returns {AvailibilityRequestSubscriber}
   */
  createAvailibilityRequestSubscriber()
  {
    const availibilityResponsePublisher = this.createAvailibilityResponsePublisher()

    return new AvailibilityRequestSubscriber(this.redisSubscriber,
      this.messageFactory, this.events, availibilityResponsePublisher)
  }

  /**
   * @returns {AvailibilityResponseDispatcher}
   */
  createAvailibilityResponseDispatcher()
  {
    const
    executionPublisher    = this.createExecutionPublisher(),
    confirmationPublisher = this.createConfirmationPublisher()

    return new AvailibilityResponseDispatcher(this.messageFactory,
      executionPublisher, confirmationPublisher)
  }

  /**
   * @returns {ProgressDispatcher}
   */
  createProgressDispatcher()
  {
    const
    completedPublisher            = this.createCompletedPublisher(),
    progressTransmitterPublisher  = this.createProgressTransmitterPublisher()

    return new ProgressDispatcher(this.messageFactory, completedPublisher,
      progressTransmitterPublisher)
  }

  /**
   * @returns {CompletedDispatcher}
   */
  createCompletedDispatcher()
  {
    return new CompletedDispatcher(this.redisSubscriber, this.messageFactory,
      this.events)
  }

  /**
   * @returns {ExecutionPublisher}
   */
  createExecutionPublisher()
  {
    return new ExecutionPublisher(this.redisPublisher, this.messageFactory)
  }

  /**
   * @returns {ProgressTransmitterPublisher}
   */
  createProgressTransmitterPublisher()
  {
    return new ProgressTransmitterPublisher(this.redisPublisher)
  }

  /**
   * @returns {CompletedPublisher}
   */
  createCompletedPublisher()
  {
    return new CompletedPublisher(this.redisPublisher, this.messageFactory)
  }

  /**
   * @returns {ConfirmationPublisher}
   */
  createConfirmationPublisher()
  {
    return new ConfirmationPublisher(this.redisPublisher, this.messageFactory)
  }

  /**
   * @returns {AvailibilityRequestPublisher}
   */
  createAvailibilityRequestPublisher()
  {
    return new AvailibilityRequestPublisher(this.redisPublisher,
      this.messageFactory)
  }

  /**
   * @returns {AvailibilityResponsePublisher}
   */
  createAvailibilityResponsePublisher()
  {
    return new AvailibilityResponsePublisher(this.redisPublisher,
      this.redisSubscriber, this.messageFactory)
  }

  /**
   * @returns {ProgressPublisher}
   */
  createProgressPublisher()
  {
    return new ProgressPublisher(this.redisPublisher, this.messageFactory)
  }

  /**
   * @returns {ContractPublisher}
   */
  createContractPublisher()
  {
    return new ContractPublisher(this.redisPublisher, this.messageFactory)
  }

  /**
   * @returns {ContractSubscriber}
   */
  createContractSubscriber()
  {
    const contractDispatcher = this.createContractDispatcher()
    return new ContractSubscriber(this.redisSubscriber, contractDispatcher,
      this.events)
  }
}

module.exports = MessageBrokerFactory
