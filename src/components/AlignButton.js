import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const hasAlign = (value, foundAlign) => {
  return value.blocks.some(node => node.data.get('align') === foundAlign)
}

// If we have an alignment, clear out the data attribute
const alignStrategy = (change, align) => {
  if (hasAlign(change.value, align)) {
    return change.setBlock({
      data: { align: null },
    }).focus()
  }
  return change.setBlock({
    data: { align },
  }).focus()
}

const AlignButton = ({
  align, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(alignStrategy(value.change(), align))
    }}
    active={hasAlign(value, align)}
  />
)

AlignButton.propTypes = {
  align: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AlignButton
