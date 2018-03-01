// Paste in prefabricated blocks from src/blocks
import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

import TableArrowTable from '../tables/table_arrow'
import TableTwoTable from '../tables/table_two'
import TableThreeTable from '../tables/table_three'

const Tables = {
  table_arrow: TableArrowTable,
  table_two: TableTwoTable,
  table_three: TableThreeTable,
}

const prefabStrategy = (change, type) => change.insertBlock(Tables[type])

const TableButton = ({
  type, icon, title, value, insideList, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    text={title}
    onMouseDown={e => {
      return onChange(prefabStrategy(value.change(), type))
    }}
    active={!insideList}
  />
)

TableButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  insideList: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TableButton
