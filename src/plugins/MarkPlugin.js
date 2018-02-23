import React from 'react'
import { isKeyHotkey } from 'is-hotkey'

const markStrategy = (change, mark) => change
  .toggleMark(mark)
  .focus()

// Handling Color too...ugh
const MarkPlugin = ({ hotkeys }) => ({
  renderMark (markProps) {
    const { marks, attributes, children } = markProps
    if (marks.size > 0 && typeof (children) === 'string') {
      const classNames = marks.map(mark => {
        if (mark.type === 'color') {
          return `color_${mark.data.get('color')}`
        }
        return `mark_${mark.type}`
      }).join(' ')

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

export default MarkPlugin
