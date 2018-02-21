// Paste in prefabricated blocks from src/blocks
import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

import TableArrowPattern from '../blocks/table_arrow'
import TableTwoPattern from '../blocks/table_two'
import TableThreePattern from '../blocks/table_three'
import ConversationPattern from '../blocks/conversation'
import ExamplesBlockPattern from '../blocks/examples_block'
import AsideBlockPattern from '../blocks/aside_block'

const Patterns = {
  table_arrow: TableArrowPattern,
  table_two: TableTwoPattern,
  table_three: TableThreePattern,
  examples_block: ExamplesBlockPattern,
  aside_block: AsideBlockPattern,
  conversation: ConversationPattern,
}

const prefabStrategy = (change, type, className) => {
  let pattern = Object.assign({}, Patterns[type])
  if (className) {
    pattern.data = { className }
  }
  return change.insertBlock(pattern)
}

const PatternButton = ({
  type, icon, className, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    text={title}
    onMouseDown={e => {
      return onChange(prefabStrategy(value.change(), type, className))
    }}
  />
)

PatternButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PatternButton
