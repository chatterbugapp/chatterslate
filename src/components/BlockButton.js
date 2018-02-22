import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const blockStrategy = (value, foundBlock) =>
  value.change()
  .setBlock(foundBlock)
  .unwrapBlock('paragraph')
  .unwrapBlock('heading-one')
  .unwrapBlock('heading-two')
  .unwrapBlock('examples_block')
  .unwrapBlock('aside_block')

const BlockButton = ({
  block, title, icon, value, onChange, insideTable,
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
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  insideTable: PropTypes.bool.isRequired,
}

export default BlockButton
