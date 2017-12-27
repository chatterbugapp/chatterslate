import React from 'react'
import PropTypes from 'prop-types'

/**
 * Toolbar button component!
 *
 * @type {Function}
 */

const ToolbarButton = props => (
  <span
    className={props.className || 'button'}
    title={props.title}
    data-active={props.active}
    onMouseDown={props.onMouseDown}
    role="button"
    tabIndex={0}
  >
    {props.icon && <i className={`fa fa-${props.icon}`} aria-hidden="true" />}
    {props.text}
  </span>
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
