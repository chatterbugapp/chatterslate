import React from 'react'

export const PatternPlugin = () => ({
  renderNode (nodeProps) {
    const {
      attributes, node, children,
    } = nodeProps

    if (node.type === 'examples_block') {
      return <div className='pattern__examples--block' {...attributes}>{children}</div>
    } else if (node.type === 'examples_header') {
      return <p className='pattern__examples--header' {...attributes}>{children}</p>
    } else if (node.type === 'examples_subheader') {
      return <p className='pattern__examples--subheader' {...attributes}>{children}</p>
    }
    return null
  },
})
