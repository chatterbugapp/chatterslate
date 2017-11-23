import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from './ToolbarButton'

/**
 * Menu button component!
 *
 * @type {Function}
 */

const ToolbarMenu = ({type, icon, title, menus, onMenuToggle, children}) => (
  <div>
    <ToolbarButton icon={icon} title={title} onMouseDown={e => onMenuToggle(e, type)} />
    <div className={`menu_${type}`} style={{ display: menus[type] ? 'block' : 'none' }}>
      {children}
    </div>
  </div>
)

ToolbarMenu.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  menus: PropTypes.object.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
}

export default ToolbarMenu
