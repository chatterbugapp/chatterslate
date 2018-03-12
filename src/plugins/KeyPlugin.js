import { isKeyHotkey } from 'is-hotkey'
import MarkStrategy from '../strategies/MarkStrategy'
import ColorStrategy from '../strategies/ColorStrategy'

// Handling Color too...ugh
const KeyPlugin = ({ hotkeys }) => ({
  onKeyDown (event, data, editor) {
    const match = Object.entries(hotkeys).find(([mark, hotkey]) => isKeyHotkey(hotkey)(event))
    if (match) {
      if (match[0].match(/^color/)) {
        return editor.onChange(ColorStrategy(editor.state.value, match[0].replace('color_', '')))
      }
      return editor.onChange(MarkStrategy(editor.state.value.change(), match[0]))
    }
    return null
  },
})

export default KeyPlugin
