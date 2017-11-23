import React from 'react'
import ToolbarButton from '../components/ToolbarButton'

const DEFAULT_COLOR = 'black'
const hasAnyColor = (value) => (value.marks.some(mark => mark.type === 'color'))
const hasColor = (value, color) => (
  value.marks.some(mark => mark.type === 'color' && mark.data.get('color') === color)
)

/**
 * When clicking a color block, if the selection has a color in it, remove it.
 * Otherwise, add a new color!
 */
const colorStrategy = (value, color) => {
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
  } else if (value.isExpanded && color !== DEFAULT_COLOR) {
    change.addMark({ type: 'color', data: { color } }).focus()
  }

  return change
}

const ColorPlugin = ({type}) => ({
  renderMark(props) {
    const { attributes, children, mark } = props
    if (mark.type === type) {
      return <span style={{ color: mark.data.get('color') }} {...attributes}>{children}</span>
    }
  },
})

const ColorButton = ({ color, icon, title, value, onChange }) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(colorStrategy(value, color))
    }}
    style={{color}}
    data-active={hasColor(value, color)}
  >
  </ToolbarButton>
)

export default {
  ColorPlugin,
  ColorButton
}
