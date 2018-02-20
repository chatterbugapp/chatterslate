import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const blockStrategy = (value, foundBlock) => value.change().setBlock(foundBlock)

const BlockButton = ({
  block, title, value, onChange, insideTable,
}) => (
  <ToolbarButton
    title={title}
    text={title}
    onMouseDown={e => {
      return onChange(blockStrategy(value, block))
    }}
    disabled={insideTable}
  />
)

BlockButton.propTypes = {
  block: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  insideTable: PropTypes.bool.isRequired,
}

export default BlockButton
