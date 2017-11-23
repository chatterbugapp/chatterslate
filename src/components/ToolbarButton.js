import React from 'react'
import PropTypes from 'prop-types'

/**
 * Toolbar button component!
 *
 * @type {Function}
 */

const ToolbarButton = props => (
  <button className="button" {...props}>
    {props.icon && <i className={`fa fa-${props.icon}`} aria-hidden="true" />}
    {props.text}
  </button>
)

ToolbarButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onMouseDown: PropTypes.func.isRequired,
  'data-active': PropTypes.bool,
  title: PropTypes.string,
}

export default ToolbarButton
