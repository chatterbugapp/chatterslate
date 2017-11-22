import React from 'react'
import PropTypes from 'prop-types'

/**
 * Toolbar button component!
 *
 * @type {Function}
 */

const ToolbarButton = props => (
  <button className="button" {...props}>
    <i className={`fa fa-${props.icon}`} aria-hidden="true" />
  </button>
)

ToolbarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  dataActive: PropTypes.bool,
  title: PropTypes.string,
}

export default ToolbarButton
