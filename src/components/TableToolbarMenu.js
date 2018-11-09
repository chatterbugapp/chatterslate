import React from 'react'
import PropTypes from 'prop-types'
import SlateEditTable from '@gitbook/slate-edit-table'
import ToolbarButton from './ToolbarButton'

const { insertRow, removeRow, removeTable } = SlateEditTable().changes

const TableToolbarMenu = ({ value, onChange }) => (
  <div>
    <small>Edit Table</small>
    <ToolbarButton icon="plus" text="Add Row" onMouseDown={e => onChange(insertRow(value.change()))} />
    <ToolbarButton icon="minus" text="Remove Row" onMouseDown={e => onChange(removeRow(value.change()))} />
    <ToolbarButton icon="trash" text="Remove Table" onMouseDown={e => onChange(removeTable(value.change()))} />
  </div>
)

TableToolbarMenu.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default TableToolbarMenu
