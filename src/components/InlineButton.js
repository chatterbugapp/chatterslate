import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const inlineStrategy = (value, type) =>
  value.change().wrapInline(type).collapseToEnd()

const InlineButton = ({
  inline, title, icon, value, onChange,
}) => (
  <ToolbarButton
    title={title}
    icon={icon}
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
