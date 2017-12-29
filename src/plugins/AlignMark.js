import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const hasMark = (value, foundMark) => value.activeMarks.some(mark => mark.type === foundMark)

// This is gross, but only 3 alignments.
const alignStrategy = (change, mark) => change
  .removeMark('left')
  .removeMark('center')
  .removeMark('right')
  .addMark(mark)
  .focus()

export const AlignMarkButton = ({
  mark, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(alignStrategy(value.change(), mark))
    }}
    active={hasMark(value, mark)}
  />
)

AlignMarkButton.propTypes = {
  mark: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
