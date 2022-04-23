import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import { checkPermission } from 'src/permission'

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
    const { component, name, badge, icon, permission, ...rest } = item
    const Component = component

    const [cookie, setPCookie] = useCookies([])
    const [allowed, setAllowed] = useState(checkPermission(permission, cookie['admin-permissions']))

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
    const { component, name, icon, to, permission, ...rest } = item
    const Component = component

    const [cookie, setPCookie] = useCookies([])
    const [allowed, setAllowed] = useState(checkPermission(permission, cookie['admin-permissions']))

    return allowed ? (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? NavGroup(item, index) : NavItem(item, index),
        )}
      </Component>
    ) : (
      <Component key={index}></Component>
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
