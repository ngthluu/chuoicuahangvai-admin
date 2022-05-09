import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

import { checkPermission } from 'src/lib/permission'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const NavItem = (item, index) => {
    const { component, name, badge, icon, module, setParentAllowed, ...rest } = item
    const Component = component

    const [allowed, setAllowed] = useState(false)
    const checkAllowed = async () => {
      const grantedPermission = await checkPermission(module, 'home')
      if (grantedPermission && typeof setParentAllowed === 'function') {
        setParentAllowed(true)
      }
      setAllowed(grantedPermission)
    }
    useEffect(() => {
      checkAllowed()
    }, [])

    return allowed ? (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: 'active',
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    ) : (
      <Component key={index}></Component>
    )
  }
  const NavGroup = (item, index) => {
    const { component, name, icon, to, setParentAllowed, ...rest } = item
    const Component = component

    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
      if (typeof setParentAllowed === 'function') setParentAllowed(allowed)
    }, [allowed])

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        className={allowed ? 'd-block' : 'd-none'}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items
            ? NavGroup({ ...item, setParentAllowed: setAllowed }, index)
            : NavItem({ ...item, setParentAllowed: setAllowed }, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? NavGroup(item, index) : NavItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
