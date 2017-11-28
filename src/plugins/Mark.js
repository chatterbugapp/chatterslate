import React from 'react'
import PropTypes from 'prop-types'
import { isKeyHotkey } from 'is-hotkey'
import ToolbarButton from '../components/ToolbarButton'

const hasMark = (value, foundMark) => value.activeMarks.some(mark => mark.type === foundMark)
const markStrategy = (change, mark) => change
  .toggleMark(mark)
  .focus()

export const MarkPlugin = ({ hotkeys }) => ({
  renderMark (markProps) {
    const { marks, attributes, children } = markProps
    if (marks.size > 0 && typeof (children) === 'string') {
      const classNames = marks.map(mark => `mark_${mark.type}`).join(' ')
      return <span className={classNames} {...attributes}>{children}</span>
    }
    return null
  },

  onKeyDown (event, data, editor) {
    const match = Object.entries(hotkeys).find(([mark, hotkey]) => isKeyHotkey(hotkey)(event))
    if (match) {
      return editor.onChange(markStrategy(editor.state.value.change(), match[0]))
    }
    return null
  },
})

export const MarkButton = ({
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
