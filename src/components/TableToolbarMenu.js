import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const onClickAddPatternRow = (event, plugin, value) => {
  return plugin.changes.insertRow(value.change())
}

const onClickRemovePatternRow = (event, plugin, value) => {
  return plugin.changes.removeRow(value.change())
}

const onClickRemovePattern = (event, plugin, value) => {
  return plugin.changes.removeTable(value.change())
}

const TableToolbarMenu = ({ plugin, value, onChange }) => (
  <div className="menu">
    <div className="separator" />
    <ToolbarButton icon="plus" title="Add Row" onMouseDown={e => onChange(onClickAddPatternRow(e, plugin, value))} />
    <ToolbarButton icon="minus" title="Remove Row" onMouseDown={e => onChange(onClickRemovePatternRow(e, plugin, value))} />
    <ToolbarButton icon="trash" title="Remove Pattern" onMouseDown={e => onChange(onClickRemovePattern(e, plugin, value))} />
  </div>
)

TableToolbarMenu.propTypes = {
  plugin: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default TableToolbarMenu
