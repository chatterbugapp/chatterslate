import React from 'react'
import ToolbarButton from '../components/ToolbarButton'

const DEFAULT_NODE = 'paragraph'
const hasBlock = (value, foundBlock) => {
  return value.blocks.some(node => node.type === foundBlock)
}
const blockStrategy = (value, foundBlock) => {
  const change = value.change()
  const { document } = value

  // Handle everything but list buttons.
  if (foundBlock !== 'bulleted-list' && foundBlock !== 'numbered-list') {
    const isActive = hasBlock(value, foundBlock)
    const isList = hasBlock(value, 'list-item')

    if (isList) {
      change
        .setBlock(isActive ? DEFAULT_NODE : foundBlock)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else {
      change.setBlock(isActive ? DEFAULT_NODE : foundBlock)
    }
  } else {
    // Handle the extra wrapping required for list buttons.
    const isList = hasBlock(value, 'list-item')
    const isType = value.blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.type === foundBlock)
    })

    if (isList && isType) {
      change
        .setBlock(DEFAULT_NODE)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else if (isList) {
      change
        .unwrapBlock(foundBlock === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
        .wrapBlock(foundBlock)
    } else {
      change.setBlock('list-item').wrapBlock(foundBlock)
    }
  }

  return change
}

const BlockPlugin = ({block, tag}) => ({
  renderNode(props) {
    const { attributes, node } = props
    if (node.type === block) {
      return React.createElement(tag, attributes)
    }
  }
})

const BlockButton = ({ block, icon, title, value, onChange }) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(blockStrategy(value, block))
    }}
    data-active={hasBlock(value, block)}
  >
  </ToolbarButton>
)

export default {
  BlockPlugin,
  BlockButton
}
