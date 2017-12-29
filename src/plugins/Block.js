import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const DEFAULT_NODE = 'paragraph'

const hasBlock = (value, foundBlock) => {
  return value.blocks.some(node => node.type === foundBlock)
}

const blockStrategy = (value, foundBlock) => {
  const change = value.change()
  const isActive = hasBlock(value, foundBlock)
  change.setBlock(isActive ? DEFAULT_NODE : foundBlock)
  return change
}

export const BlockPlugin = ({ block, tag, attributes }) => ({
  renderNode (nodeProps) {
    const { node, children } = nodeProps
    if (node.type === block) {
      return React.createElement(tag, Object.assign(nodeProps.attributes, attributes), children)
    }
    return null
  },
})

export const BlockButton = ({
  block, icon, title, value, onChange, insideTable,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(blockStrategy(value, block))
    }}
    active={hasBlock(value, block)}
    disabled={insideTable}
  />
)

BlockButton.propTypes = {
  block: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  insideTable: PropTypes.bool.isRequired,
}
