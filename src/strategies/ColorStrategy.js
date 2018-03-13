const DefaultColor = 'black'
const hasAnyColor = value => (value.marks.some(mark => mark.type === 'color'))
let lastColor = DefaultColor

/**
 * When clicking a color block, if the selection has a color in it, remove it.
 * Otherwise, add a new color! Fallback to lastColor used if none was set.
 */
const ColorStrategy = (value, color = lastColor) => {
  const change = value.change()

  // Adapted from https://github.com/nossas/slate-editor/blob/master/lib/plugins/slate-color-plugin/ColorUtils.js
  if (hasAnyColor(value)) {
    if (value.isExpanded) {
      value.marks.filter(mark => mark.type === 'color').forEach(mark => {
        change.removeMark(mark)
      })
    }
  }

  if (color !== DefaultColor) {
    change.addMark({ type: 'color', data: { color } }).focus()
    lastColor = color
  }

  return change
}

export default ColorStrategy
