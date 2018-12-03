const
MessageBroker                   = require('.'),
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
AvailibilityResponseSubscriber  = require('./subscriber/availibility-response'),
CompletedSubscriber             = require('./subscriber/completed'),
ConfirmationSubscriber          = require('./subscriber/confirmation'),
ContractSubscriber              = require('./subscriber/contract'),
ProgressSubscriber              = require('./subscriber/progress')

class MessageBrokerFactory
{
  constructor(messageFactory, events, redisClient)
  {
    this.messageFactory = messageFactory
    this.events         = events
    this.redis          = redisClient
  }

  /**
   * @returns {MessageBroker}
   */
  createMessageBroker()
  {
    const
    availibilityRequestSubscriber = this.createAvailibilityRequestSubscriber(),
    contractSubscriber            = this.createContractSubscriber(),
    progressPublisher             = this.createProgressPublisher(),
    contractPublisher             = this.createContractPublisher()

    return new MessageBroker(availibilityRequestSubscriber, contractSubscriber,
       progressPublisher, contractPublisher)
  }

  /**
   * @returns {MessageSubscriber}
   */
  createMessageSubscriber()
  {
    const
    redisClient = this.redis,
    events      = this.events

    return new MessageSubscriber(redisClient, events)
  }

  /**
   * @returns {AvailibilityRequestSubscriber}
   */
  createAvailibilityRequestSubscriber()
  {
    const
    redisClient                   = this.redis,
    messageFactory                = this.messageFactory,
    events                        = this.events,
    availibilityResponsePublisher = this.createAvailibilityResponsePublisher()

    return new AvailibilityRequestSubscriber(redisClient, messageFactory,
      events, availibilityResponsePublisher)
  }

  /**
   * @returns {ContractSubscriber}
   */
  createContractSubscriber()
  {
    const
    redisClient                     = this.redis,
    messageFactory                  = this.messageFactory,
    events                          = this.events,
    availibilityRequestPublisher    = this.createAvailibilityRequestPublisher(),
    availibilityResponseSubscriber  = this.createAvailibilityResponseSubscriber(),
    progressSubscriber              = this.createProgressSubscriber(),
    confirmationSubscriber          = this.createConfirmationSubscriber(),
    completedSubscriber             = this.createCompletedSubscriber()

    return new ContractSubscriber(redisClient, messageFactory, events,
      availibilityRequestPublisher, availibilityResponseSubscriber,
      progressSubscriber, confirmationSubscriber, completedSubscriber)
  }

  /**
   * @returns {AvailibilityResponseSubscriber}
   */
  createAvailibilityResponseSubscriber()
  {
    const
    redisClient           = this.redis,
    messageFactory        = this.messageFactory,
    executionPublisher    = this.createExecutionPublisher(),
    confirmationPublisher = this.createConfirmationPublisher()

    return new AvailibilityResponseSubscriber(redisClient, messageFactory,
      executionPublisher, confirmationPublisher)
  }

  /**
   * @returns {ProgressSubscriber}
   */
  createProgressSubscriber()
  {
    const
    redisClient                   = this.redis,
    messageFactory                = this.messageFactory,
    completedPublisher            = this.createCompletedPublisher(),
    progressTransmitterPublisher  = this.createProgressTransmitterPublisher()

    return new ProgressSubscriber(redisClient, messageFactory,
      completedPublisher, progressTransmitterPublisher)
  }

  /**
   * @returns {ConfirmationSubscriber}
   */
  createConfirmationSubscriber()
  {
    return new ConfirmationSubscriber(this.messageFactory)
  }

  /**
   * @returns {CompletedSubscriber}
   */
  createCompletedSubscriber()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory,
    events          = this.events

    return new CompletedSubscriber(redisClient, messageFactory, events)
  }

  /**
   * @returns {ExecutionPublisher}
   */
  createExecutionPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new ExecutionPublisher(redisClient, messageFactory)
  }

  /**
   * @returns {ProgressTransmitterPublisher}
   */
  createProgressTransmitterPublisher()
  {
    return new ProgressTransmitterPublisher(this.redis)
  }

  /**
   * @returns {CompletedPublisher}
   */
  createCompletedPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new CompletedPublisher(redisClient, messageFactory)
  }

  /**
   * @returns {ConfirmationPublisher}
   */
  createConfirmationPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new ConfirmationPublisher(redisClient, messageFactory)
  }

  /**
   * @returns {AvailibilityRequestPublisher}
   */
  createAvailibilityRequestPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new AvailibilityRequestPublisher(redisClient, messageFactory)
  }

  /**
   * @returns {AvailibilityResponsePublisher}
   */
  createAvailibilityResponsePublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new AvailibilityResponsePublisher(redisClient, messageFactory)
  }

  /**
   * @returns {ProgressPublisher}
   */
  createProgressPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new ProgressPublisher(redisClient, messageFactory)
  }

  /**
   * @returns {ContractPublisher}
   */
  createContractPublisher()
  {
    const
    redisClient     = this.redis,
    messageFactory  = this.messageFactory

    return new ContractPublisher(redisClient, messageFactory)
  }
}

module.exports = MessageBrokerFactory
