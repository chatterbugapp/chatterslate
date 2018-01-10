// via https://github.com/ianstormtaylor/slate/blob/master/examples/tables/index.js
import React from 'react'

export const TablePlugin = () => ({
  renderNode (nodeProps) {
    const { attributes, node, children } = nodeProps

    switch (node.type) {
      case 'table':
        return <table className={node.data.get('className')} {...attributes}><tbody>{children}</tbody></table>
      case 'table_row':
        return <tr {...attributes}>{children}</tr>
      case 'table_cell':
        const align = node.data.get('align')
        const className = align ? `align_${align}` : null
        return <td className={className} {...attributes}>{children}</td>
      default: return null
    }
  },
})
