import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { socket } from 'src/lib/socket'
import { toast, ToastContainer } from 'react-toastify'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const fetchNotificationData = async () => {
    console.log('AAA')
  }

  socket.on('notification', (message) => {
    toast(message)
    fetchNotificationData()
  })

  return (
    <CHeader position="sticky" className="mb-4">
      <ToastContainer></ToastContainer>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="/notifications">
              <div className="position-relative">
                <CIcon icon={cilBell} size="lg" />
                <CBadge color="danger" position="top-end" shape="rounded-circle">
                  20
                </CBadge>
              </div>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
