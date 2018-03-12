import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const hasInline = (value, inline) => {
  return value.inlines.some(node => node.type === inline)
}

const inlineStrategy = (value, inline) => {
  const change = value.change()

  if (value.isExpanded) {
    if (hasInline(value, inline)) {
      return change.unwrapInline(inline)
    } else {
      return change.unwrapInline(inline).wrapInline(inline)
    }
  } else {
    return change
  }
}

const InlineButton = ({
  inline, title, icon, value, onChange,
}) => (
  <ToolbarButton
    title={title}
    icon={icon}
    active={hasInline(value, inline)}
    onMouseDown={e => {
      return onChange(inlineStrategy(value, inline))
    }}
  />
)

InlineButton.propTypes = {
  inline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InlineButton
