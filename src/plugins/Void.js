import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const voidStrategy = (change, type) => change.insertInline({ type, isVoid: true })

const VoidPlugin = ({ type, tag }) => ({
  renderNode (props) {
    const { attributes, node } = props
    return (node.type === type) ? React.createElement(tag, attributes) : null
  },
})

const VoidButton = ({
  type, icon, title, value, onChange,
}) => (
  <ToolbarButton
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
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default {
  VoidPlugin,
  VoidButton,
}
