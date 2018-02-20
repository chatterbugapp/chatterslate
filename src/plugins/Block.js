import React from 'react'

export const BlockPlugin = ({ block, tag, attributes }) => ({
  renderNode (nodeProps) {
    const { node, children } = nodeProps
    if (node.type === block) {
      return React.createElement(tag, Object.assign(nodeProps.attributes, attributes), children)
    }
    return null
  },
})
