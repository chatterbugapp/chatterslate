import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

import EditListPlugin from '../plugins/EditListPlugin'

const { isSelectionInList } = EditListPlugin.utils
const { unwrapList, wrapInList } = EditListPlugin.changes

const ListBlockButton = ({
  block, icon, text, title, value, data, onChange,
}) => {
  const inList = isSelectionInList(value)
  const activeInListType = inList && value.blocks.some(lookBlock => {
    return !!value.document.getClosest(lookBlock.key, parent => parent.type === block)
  })

  return (<ToolbarButton
    icon={icon}
    text={text}
    title={title}
    onMouseDown={() => {
      // Unwrap list if same list button is hit as the active list
      if (activeInListType) {
        return onChange(unwrapList(value.change(), block))
      }
      // rewrap list if different list block
      if (inList) {
        return onChange(wrapInList(unwrapList(value.change(), block), block, data))
      }
      // wrap list if no list
      return onChange(wrapInList(value.change(), block, data))
    }}
    active={activeInListType}
  />)
}

ListBlockButton.propTypes = {
  block: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.object.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default ListBlockButton
