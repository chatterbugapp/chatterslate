import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const onClickAddTableRow = (event, plugin, value) => {
  return plugin.changes.insertRow(value.change())
}

const onClickRemoveTableRow = (event, plugin, value) => {
  return plugin.changes.removeRow(value.change())
}

const onClickRemoveTable = (event, plugin, value) => {
  return plugin.changes.removeTable(value.change())
}

const TableToolbarMenu = ({ plugin, value, onChange }) => (
  <div>
    <small>Edit Table</small>
    <ToolbarButton icon="plus" text="Add Row" onMouseDown={e => onChange(onClickAddTableRow(e, plugin, value))} />
    <ToolbarButton icon="minus" text="Remove Row" onMouseDown={e => onChange(onClickRemoveTableRow(e, plugin, value))} />
    <ToolbarButton icon="trash" text="Remove Table" onMouseDown={e => onChange(onClickRemoveTable(e, plugin, value))} />
  </div>
)

TableToolbarMenu.propTypes = {
  plugin: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default TableToolbarMenu
