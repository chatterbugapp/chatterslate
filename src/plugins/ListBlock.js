import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

// plugin is an instance of EditListPlugin
// via https://github.com/GitbookIO/slate-edit-list/blob/master/example/main.js
export const ListBlockButton = ({
  block, icon, title, value, onChange, insideTable, plugin
}) => {
  const inList = plugin.utils.isSelectionInList(value)
  const activeInListType = inList && value.blocks.some(lookBlock => {
    return !!value.document.getClosest(lookBlock.key, parent => parent.type === block)
  })

  return (<ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={() => {
      if (inList) {
        return onChange(plugin.changes.unwrapList(value.change(), block))
      } else {
        return onChange(plugin.changes.wrapInList(value.change(), block))
      }
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
  plugin: PropTypes.object.isRequired
}
