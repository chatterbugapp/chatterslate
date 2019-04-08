const DefaultSpeaker = 'student'

/**
 * Alternates a conversation list item between speaker and tutor.
 */
const SpeakerStrategy = (value) => {
  const change = value.change()
  const firstBlock = change.value.startBlock

  if (firstBlock) {
    const itemBlock = change.value.document.getClosestBlock(firstBlock.key)
    if (itemBlock && itemBlock.type === 'list_item') {
      const data = { className: itemBlock.hasClass('tutor') ? 'student' : 'tutor' }
      return change.setNodeByKey(itemBlock.key, { data })
    }
  }

  return change
}

export default SpeakerStrategy
