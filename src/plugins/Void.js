import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const voidStrategy = (change, type) => change.insertInline({ type, isVoid: true })

export const VoidPlugin = ({ type, tag, attributes }) => ({
  renderNode (nodeProps) {
    const { node } = nodeProps
    return (node.type === type) ? React.createElement(tag, attributes) : null
  },
})

export const VoidButton = ({
  type, text, icon, title, value, onChange,
}) => (
  <ToolbarButton
    text={text}
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
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
