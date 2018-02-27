import React from 'react'

const PatternPlugin = () => ({
  renderNode (nodeProps) {
    const {
      attributes, node, children,
    } = nodeProps

    switch (node.type) {
      case 'examples_block':
        return <div className="pattern__examples_block" {...attributes}>{children}</div>
      case 'aside_block':
        return (
          <div className={`pattern__${node.data.get('className')}_container`}>
            <div className={`pattern__${node.data.get('className')}_block`} {...attributes}>{children}</div>
          </div>
        )
      case 'examples_text':
        return <span className="pattern__examples_text" {...attributes}>{children}</span>
      case 'examples_translation':
        return <span className="pattern__examples_translation" {...attributes}>{children}</span>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'ol_list':
        return <ol {...attributes}>{children}</ol>
      case 'ul_list':
        return <ul {...attributes}>{children}</ul>
      case 'list_item':
        return <li {...attributes}>{children}</li>
      default:
        return null
    }
  },
})

export default PatternPlugin
