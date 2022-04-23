import React from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { Link } from 'react-router-dom'

const AppSidebar = () => {
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow}>
      <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/dashboard'}>
        <CSidebarBrand className="d-none d-md-flex">
          <h1> CHV </h1>
        </CSidebarBrand>
      </Link>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
