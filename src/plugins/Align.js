import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

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

export const AlignButton = ({
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

export const AlignPlugin = () => ({
  renderNode (nodeProps) {
    const { attributes, children, node } = nodeProps
    const align = node.data.get('align')
    if (align) {
      return <div {...attributes} className={`align_${align}`}>{children}</div>
    }
    return null
  },
})

AlignButton.propTypes = {
  align: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
