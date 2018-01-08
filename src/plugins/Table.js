// via https://github.com/ianstormtaylor/slate/blob/master/examples/tables/index.js
import React from 'react'

export const TablePlugin = () => ({
  renderNode (nodeProps) {
    const { attributes, node, children } = nodeProps
    const className = node.data.get('className')
    const contentEditable = node.data.get('contentEditable')

    switch (node.type) {
      case 'table': return <table className={className} {...attributes}><tbody>{children}</tbody></table>
      case 'table_row': return <tr {...attributes}>{children}</tr>
      case 'table_cell': return <td contentEditable={contentEditable} {...attributes}>{children}</td>
      default: return null
    }
  },
})
