import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const plainStrategy = (change, text) => change.insertText(text)

export const PlainButton = ({
  text, title, value, onChange,
}) => (
  <ToolbarButton
    text={text}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(plainStrategy(value.change(), text))
    }}
  />
)

PlainButton.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
