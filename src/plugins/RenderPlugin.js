import React from 'react'

const RenderPlugin = () => ({
  renderMark (markProps) {
    const { marks, attributes, children } = markProps
    if (marks.size > 0 && typeof (children) === 'string') {
      const classNames = marks.map(mark => {
        if (mark.type === 'color') {
          return `color_${mark.data.get('color')}`
        }
        return `mark_${mark.type}`
      }).join(' ')

      return <span className={classNames} {...attributes}>{children}</span>
    }
    return null
  },

  renderNode (nodeProps) {
    const {
      attributes, node, children, parent,
    } = nodeProps

    switch (node.type) {
      case 'learning-language':
        return <span className="pattern__learning_language" {...attributes}>{children}</span>
      case 'heading-one':
        return <header className="heading-one" {...attributes}>{children}</header>
      case 'heading-two':
        return <header className="heading-two" {...attributes}>{children}</header>
      case 'ol_list':
        return <ol className="pattern__normal_list" {...attributes}>{children}</ol>
      case 'ul_list':
        return <ul className="pattern__normal_list" {...attributes}>{children}</ul>
      case 'pattern__conversation':
      case 'pattern__examples':
        return <div className={`${node.type}_block`} {...attributes}>{children}</div>
      case 'pattern__note':
      case 'pattern__center':
      case 'pattern__cultural':
      case 'pattern__watchout':
      case 'pattern_aside':
        return <div className={`${node.type}_block`} {...attributes}>{children}</div>
      case 'list_item':
        if (parent.type === 'ol_list' || parent.type === 'ul_list') {
          return <li className="pattern__normal_item" {...attributes}>{children}</li>
        }
        return <div className={`pattern__${node.data.get('className') || 'normal'}_item`}{...attributes}>{children}</div>

      default:
        return null
    }
  },
})

export default RenderPlugin
