import React from 'react'

const PatternPlugin = () => ({
  renderNode (nodeProps) {
    const {
      attributes, node, children, parent
    } = nodeProps

    switch (node.type) {
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'ol_list':
        return <ol className="pattern__normal_list" {...attributes}>{children}</ol>
      case 'ul_list':
        return <ul className="pattern__normal_list" {...attributes}>{children}</ul>
      case 'pattern_conversation':
        return <div className="pattern__conversation_block" {...attributes}>{children}</div>
      case 'pattern_examples':
        return <div className="pattern__examples_block" {...attributes}>{children}</div>
      case 'pattern_aside':
        return <div className={`pattern__${node.data.get('className') || 'center'}_block`} {...attributes}>{children}</div>
      case 'list_item':
        if (parent.type === 'ol_list' || parent.type === 'ul_list') {
          return <li className='pattern__normal_item' {...attributes}>{children}</li>
        } else {
          return <div className={`pattern__${node.data.get('className') || 'normal'}_item`}{...attributes}>{children}</div>
        }
      default:
        return null
    }
  },
})

export default PatternPlugin
