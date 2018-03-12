import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'
import MarkStrategy from '../strategies/MarkStrategy'

const hasMark = (value, foundMark) => value.marks.some(mark => mark.type === foundMark)

const MarkButton = ({
  mark, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(MarkStrategy(value.change(), mark))
    }}
    active={hasMark(value, mark)}
  />
)

MarkButton.propTypes = {
  mark: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MarkButton
