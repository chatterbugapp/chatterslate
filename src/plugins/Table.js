// via https://github.com/ianstormtaylor/slate/blob/master/examples/tables/index.js
import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

import ArrowTable from '../blocks/arrow'
import ConversationTable from '../blocks/conversation'
import MiddleTable from '../blocks/middle'

const Tables = {
  arrow: ArrowTable,
  conversation: ConversationTable,
  middle: MiddleTable,
}

const tableStrategy = (change, type) =>
  change.insertBlock(Tables[type])

export const TablePlugin = ({ type }) => ({
  renderNode (nodeProps) {
    const { attributes, node, children } = nodeProps
    switch (node.type) {
      case 'table': return <table className={`table_${type}`} {...attributes}><tbody>{children}</tbody></table>
      case 'table_row': return <tr {...attributes}>{children}</tr>
      case 'table_cell': return <td {...attributes}>{children}</td>
      default: return null
    }
  },
})

export const TableButton = ({
  type, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(tableStrategy(value.change(), type))
    }}
  />
)

TableButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
