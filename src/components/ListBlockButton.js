import React from 'react'
import PropTypes from 'prop-types'
import SlateEditList from 'slate-edit-list'
import ToolbarButton from './ToolbarButton'

const plugin = SlateEditList()
const { isSelectionInList } = plugin.utils
const { unwrapList, wrapInList } = plugin.changes

const ListBlockButton = ({
  block, icon, title, value, onChange, insideTable,
}) => {
  const inList = isSelectionInList(value)
  const activeInListType = inList && value.blocks.some(lookBlock => {
    return !!value.document.getClosest(lookBlock.key, parent => parent.type === block)
  })

  return (<ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={() => {
      if (inList) {
        return onChange(unwrapList(value.change(), block))
      }
      return onChange(wrapInList(value.change(), block))
    }}
    active={activeInListType}
    disabled={insideTable}
  />)
}

ListBlockButton.propTypes = {
  block: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  insideTable: PropTypes.bool.isRequired,
}

export default ListBlockButton
