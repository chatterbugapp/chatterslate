import React from 'react'
import ToolbarButton from '../components/ToolbarButton'
import { isKeyHotkey } from 'is-hotkey'
const isBoldHotkey = isKeyHotkey('mod+b')

const BoldNode = ({ children }) => (
  <strong>{children}</strong>
)

const BoldSchema = {
  marks: {
    bold: BoldNode,
  },
}

const BoldPlugin = options => ({
  renderMark(props) {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return BoldNode(props)
      default: return null
    }
  },

  schema: BoldSchema,

  onKeyDown(...args) {
    return BoldKeyboardShortcut(...args)
  },
})

const hasMark = value => value.activeMarks.some(mark => mark.type === 'bold')
const boldMarkStrategy = change => change
  .toggleMark('bold')
  .focus()

const BoldKeyboardShortcut = (event, data, editor) => {
  if (isBoldHotkey(event)) {
    return editor.onChange(boldMarkStrategy(editor.state.value.change()))
  }
}

const BoldButton = ({ value, onChange }) => (
  <ToolbarButton
    icon="bold"
    title="Bold"
    onMouseDown={e => {
      e.preventDefault()
      return onChange(boldMarkStrategy(value.change()))
    }}
    data-active={hasMark(value)}
  >
  </ToolbarButton>
)

export default {
  BoldPlugin,
  BoldSchema,
  BoldNode,
  BoldKeyboardShortcut,
  BoldButton
}
