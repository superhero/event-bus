class MessageSubscriber
{
  constructor(redisClient, events)
  {
   this.redis   = redisClient
   this.events  = events
  }

  subscribe(channel, message)
  {
    this.redis.on('message', () => this.events.emit(channel, message))
  }
}

module.exports = MessageSubscriber
