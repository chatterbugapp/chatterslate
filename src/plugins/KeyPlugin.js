import { isKeyHotkey } from 'is-hotkey'
import MarkStrategy from '../strategies/MarkStrategy'
import ColorStrategy from '../strategies/ColorStrategy'
import TopicColors from '../TopicColors'

const markHotkeys = Object.entries({
  bold: isKeyHotkey('mod+b'),
  italic: isKeyHotkey('mod+i'),
  underline: isKeyHotkey('mod+u'),
})

const colorHotkeys = Object.entries(TopicColors)
  .filter(([color, colorProps]) => colorProps.hotkey)
  .map(([color, colorProps]) => [color, isKeyHotkey(colorProps.hotkey)])

const lastColorHotkey = isKeyHotkey('mod+shift+x')
const switchSpeakerHotkey = isKeyHotkey('mod+k')

const KeyPlugin = () => ({
  onKeyDown (event, data, editor) {
    const markMatch = markHotkeys.find(([mark, hotkey]) => hotkey(event))
    if (markMatch) {
      event.preventDefault()
      return editor.onChange(MarkStrategy(editor.state.value, markMatch[0]))
    }

    const colorMatch = colorHotkeys.find(([mark, hotkey]) => hotkey(event))
    if (colorMatch) {
      event.preventDefault()
      return editor.onChange(ColorStrategy(editor.state.value, colorMatch[0]))
    }

    if (lastColorHotkey(event)) {
      event.preventDefault()
      return editor.onChange(ColorStrategy(editor.state.value))
    }

    if (switchSpeakerHotkey(event)) {
      event.preventDefault()
      return editor.onChange(SpeakerStrategy(editor.state.value))
    }

    return null
  },
})

export default KeyPlugin
