// Paste in prefabricated blocks from src/blocks
import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

import ArrowPattern from '../blocks/arrow'
import MiddlePattern from '../blocks/middle'
import ThreePattern from '../blocks/three'
import ConversationPattern from '../blocks/conversation'
import ExamplesPattern from '../blocks/examples'

const Patterns = {
  arrow: ArrowPattern,
  conversation: ConversationPattern,
  middle: MiddlePattern,
  three: ThreePattern,
  examples: ExamplesPattern,
}

const prefabStrategy = (change, type) =>
  change.insertBlock(Patterns[type])

const PatternButton = ({
  type, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    text={title}
    onMouseDown={e => {
      return onChange(prefabStrategy(value.change(), type))
    }}
  />
)

PatternButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PatternButton