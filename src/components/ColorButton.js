import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'
import ColorStrategy from '../strategies/ColorStrategy'

const hasColor = (value, color) => (
  value.marks.some(mark => mark.type === 'color' && mark.data.get('color') === color)
)

const ColorButton = ({
  color, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(ColorStrategy(value, color))
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

export default ColorButton
