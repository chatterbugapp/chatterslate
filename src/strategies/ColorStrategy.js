const DEFAULT_COLOR = 'black'
const hasAnyColor = value => (value.marks.some(mark => mark.type === 'color'))

/**
 * When clicking a color block, if the selection has a color in it, remove it.
 * Otherwise, add a new color!
 */
const ColorStrategy = (value, color) => {
  const change = value.change()

  // Adapted from https://github.com/nossas/slate-editor/blob/master/lib/plugins/slate-color-plugin/ColorUtils.js
  if (hasAnyColor(value)) {
    if (value.isExpanded) {
      value.marks.filter(mark => mark.type === 'color').forEach(mark => {
        change.removeMark(mark)
      })

      if (color !== DEFAULT_COLOR) {
        change.addMark({ type: 'color', data: { color } }).focus()
      }
    }
  } else if (color !== DEFAULT_COLOR) {
    change.addMark({ type: 'color', data: { color } }).focus()
  }

  return change
}

export default ColorStrategy
