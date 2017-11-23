import React from 'react'
import ToolbarButton from '../components/ToolbarButton'

const voidStrategy = (change, type) => change.insertInline({ type, isVoid: true })

const VoidPlugin = ({type, tag}) => ({
  renderNode(props) {
    const { attributes, children, node } = props
    if (node.type === type) {
      return React.createElement(tag, attributes)
    }
  }
})

const VoidButton = ({ type, icon, title, value, onChange }) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(voidStrategy(value.change(), type))
    }}
  >
  </ToolbarButton>
)

export default {
  VoidPlugin,
  VoidButton
}
