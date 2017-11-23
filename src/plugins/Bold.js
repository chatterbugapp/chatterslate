import React from 'react'
import ToolbarButton from '../components/ToolbarButton'
import { isKeyHotkey } from 'is-hotkey'

const BoldMark = 'bold'
const BoldNode = ({ children }) => (<strong>{children}</strong>)

const hasMark = value => value.activeMarks.some(mark => mark.type === BoldMark)
const boldMarkStrategy = change => change
  .toggleMark(BoldMark)
  .focus()

const isBoldHotkey = isKeyHotkey('mod+b')
const BoldKeyboardShortcut = (event, data, editor) => {
  if (isBoldHotkey(event)) {
    return editor.onChange(boldMarkStrategy(editor.state.value.change()))
  }
}

const BoldPlugin = options => ({
  renderMark(props) {
    const { children, mark } = props
    if (mark.type === BoldMark) {
      return BoldNode(props)
    }
  },

  onKeyDown(...args) {
    return BoldKeyboardShortcut(...args)
  },
})


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
  BoldButton
}
