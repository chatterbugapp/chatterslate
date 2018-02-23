import React from 'react'

const AlignPlugin = () => ({
  renderNode (nodeProps) {
    const { attributes, children, node } = nodeProps
    const align = node.data.get('align')
    if (align) {
      return <div {...attributes} className={`align_${align}`}>{children}</div>
    }
    return null
  },
})

export default AlignPlugin
