import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from './../../assets/images/no-avatar.png'

import { useCookies } from 'react-cookie'

const AppHeaderDropdown = () => {
  const [cookies, removeCookie] = useCookies([process.env.REACT_APP_COOKIE_NAME])
  const handleLogout = () => {
    removeCookie(process.env.REACT_APP_COOKIE_NAME)
  }

  const [modalChangePasswordVisible, setModalChangePasswordVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const handleChangePassword = (e) => {
    setModalChangePasswordVisible(false)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Thiết lập</CDropdownHeader>
        <CDropdownItem href="#" onClick={() => setModalChangePasswordVisible(true)}>
          <CIcon icon={cilSettings} className="me-2" />
          Thay đổi mật khẩu
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>

      <CModal
        visible={modalChangePasswordVisible}
        onClose={() => setModalChangePasswordVisible(false)}
      >
        <CModalHeader onClose={() => setModalChangePasswordVisible(false)}>
          <CModalTitle>Thay đổi mật khẩu</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol col={12} className="mb-3">
              <CFormLabel>Mật khẩu hiện tại</CFormLabel>
              <CFormInput
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mật khẩu hiện tại"
              ></CFormInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol col={12} className="mb-3">
              <CFormLabel>Mật khẩu mới</CFormLabel>
              <CFormInput
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mật khẩu mới"
              ></CFormInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol col={12} className="mb-3">
              <CFormLabel>Nhập lại mật khẩu</CFormLabel>
              <CFormInput
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
              ></CFormInput>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            className="text-white"
            onClick={() => setModalChangePasswordVisible(false)}
          >
            Đóng
          </CButton>
          <CButton color="info" className="text-white" onClick={handleChangePassword}>
            Thay đổi
          </CButton>
        </CModalFooter>
      </CModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown
