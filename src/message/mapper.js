class MessageMapper
{
  mapCommitments(commitments)
  {
    const output = {}
    for(const commitment of commitments)
      output[commitment] = []

    return output
  }
}

module.exports = MessageMapper
