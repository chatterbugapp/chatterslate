import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const DEFAULT_COLOR = 'black'
const hasAnyColor = value => (value.marks.some(mark => mark.type === 'color'))
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
  } else if (color !== DEFAULT_COLOR) {
    change.addMark({ type: 'color', data: { color } }).focus()
  }

  return change
}

export const ColorButton = ({
  color, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(colorStrategy(value, color))
    }}
    className={`button color_${color}`}
    active={hasColor(value, color)}
  />
)

ColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
