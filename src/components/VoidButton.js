import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

const voidStrategy = (change, type) => change.insertInline({ type, isVoid: true })

const VoidButton = ({
  type, text, icon, title, value, onChange,
}) => (
  <ToolbarButton
    text={text}
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(voidStrategy(value.change(), type))
    }}
  />
)

VoidButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default VoidButton
