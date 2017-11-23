import React from 'react'
import PropTypes from 'prop-types'
import { isKeyHotkey } from 'is-hotkey'
import ToolbarButton from '../components/ToolbarButton'

const hasMark = (value, foundMark) => value.activeMarks.some(mark => mark.type === foundMark)
const markStrategy = (change, mark) => change
  .toggleMark(mark)
  .focus()

const MarkPlugin = ({ mark, tag, hotkey }) => ({
  renderMark (props) {
    return (props.mark.type === mark) ? React.createElement(tag, props) : null
  },

  onKeyDown (event, data, editor) {
    return (hotkey && isKeyHotkey(hotkey)(event))
      ? editor.onChange(markStrategy(editor.state.value.change(), mark)) : null
  },
})

const MarkButton = ({
  mark, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(markStrategy(value.change(), mark))
    }}
    data-active={hasMark(value, mark)}
  />
)

MarkButton.propTypes = {
  mark: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default {
  MarkPlugin,
  MarkButton,
}
