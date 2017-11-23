import React from 'react'
import ToolbarButton from '../components/ToolbarButton'
import { isKeyHotkey } from 'is-hotkey'

const hasMark = (value, foundMark) => value.activeMarks.some(mark => mark.type === foundMark)
const markStrategy = (change, mark) => change
  .toggleMark(mark)
  .focus()

const MarkPlugin = ({mark, tag, hotkey}) => ({
  renderMark(props) {
    if (props.mark.type === mark) {
      return React.createElement(tag, props)
    }
  },

  onKeyDown(event, data, editor) {
    if (isKeyHotkey(hotkey)(event)) {
      return editor.onChange(markStrategy(editor.state.value.change(), mark))
    }
  },
})

const MarkButton = ({ mark, icon, title, value, onChange }) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(markStrategy(value.change(), mark))
    }}
    data-active={hasMark(value, mark)}
  >
  </ToolbarButton>
)

export default {
  MarkPlugin,
  MarkButton
}
