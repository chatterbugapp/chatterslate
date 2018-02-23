import React from 'react'

const VoidPlugin = ({ type, tag, attributes }) => ({
  renderNode (nodeProps) {
    const { node } = nodeProps
    return (node.type === type) ? React.createElement(tag, attributes) : null
  },
})

export default VoidPlugin
