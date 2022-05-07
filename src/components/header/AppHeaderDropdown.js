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
  CForm,
  CFormFeedback,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from './../../assets/images/no-avatar.png'

import { useCookies } from 'react-cookie'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppHeaderDropdown = () => {
  const [cookie, removeCookie] = useCookies([process.env.REACT_APP_COOKIE_NAME])
  const handleLogout = () => {
    removeCookie(process.env.REACT_APP_COOKIE_NAME)
    removeCookie(process.env.REACT_APP_COOKIE_PERMISSION_NAME)
  }

  const [modalChangePasswordVisible, setModalChangePasswordVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }
    if (newPassword !== rePassword) {
      e.stopPropagation()
      return
    }
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      rePassword: rePassword,
    }
    axios
      .post(`${process.env.REACT_APP_STRAPI_URL}/api/user-reset-password`, data)
      .then((response) => {
        toast.success('Thao tác thành công')
        handleLogout()
      })
      .catch((error) => {
        const errorMessage = error.response.data.error.message
        toast.error(`Thao tác thất bại (${errorMessage})!!`)
      })
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
        <ToastContainer />
        <CModalHeader onClose={() => setModalChangePasswordVisible(false)}>
          <CModalTitle>Thay đổi mật khẩu</CModalTitle>
        </CModalHeader>

        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalBody>
            <CRow>
              <CCol col={12} className="mb-3">
                <CFormLabel>Mật khẩu hiện tại</CFormLabel>
                <CFormInput
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Mật khẩu hiện tại"
                  required
                ></CFormInput>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
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
                  required
                ></CFormInput>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
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
                  required
                  invalid={rePassword !== newPassword}
                ></CFormInput>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              className="text-white"
              type="button"
              onClick={() => setModalChangePasswordVisible(false)}
            >
              Đóng
            </CButton>
            <CButton type="submit" color="info" className="text-white">
              Thay đổi
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown
