import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const blockStrategy = (value, type, data) =>
  value.change()
  .setBlock({ type, data })
  .unwrapBlock('paragraph')
  .unwrapBlock('heading-one')
  .unwrapBlock('heading-two')
  .unwrapBlock('examples_block')
  .unwrapBlock('aside_block')

const BlockButton = ({
  block, data, title, icon, value, onChange, insideTable,
}) => (
  <ToolbarButton
    title={title}
    icon={icon}
    text={title}
    onMouseDown={e => {
      return onChange(blockStrategy(value, block, data))
    }}
    disabled={insideTable}
  />
)

BlockButton.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.object,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  insideTable: PropTypes.bool.isRequired,
}

export default BlockButton
