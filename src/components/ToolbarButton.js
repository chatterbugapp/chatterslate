import React from 'react'
import PropTypes from 'prop-types'

/**
 * Toolbar button component!
 *
 * @type {Function}
 */

const ToolbarButton = props => (
  <button
    className={props.className || 'button'}
    title={props.title}
    data-active={props.active}
    onMouseDown={props.onMouseDown}
  >
    {props.icon && <i className={`fa fa-${props.icon}`} aria-hidden="true" />}
    {props.text}
  </button>
)

ToolbarButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onMouseDown: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string,
}

export default ToolbarButton
