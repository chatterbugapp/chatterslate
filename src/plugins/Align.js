import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const hasAlign = (value, align) => {
  return value.inlines.some(inline => inline.data.get('align') === align)
}

const alignStrategy = (change, align) => change
  .unwrapInline('align')
  .wrapInline({
    type: 'align',
    data: { align: align }
  }).collapseToEnd()

export const AlignButton = ({
  align, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      return onChange(alignStrategy(value.change(), align))
    }}
    active={hasAlign(value, align)}
  />
)

export const AlignPlugin = () => ({
  renderNode (nodeProps) {
    const { attributes, children, node } = nodeProps
    switch (node.type) {
      case 'align': {
        const { data } = node
        return <p {...attributes} className={`align_${data.get('align')}`}>{children}</p>
      }
    }
    return null
  },
})

AlignButton.propTypes = {
  align: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
