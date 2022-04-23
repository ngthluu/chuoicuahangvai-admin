import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useCookies } from 'react-cookie'
import { getPermissionsData } from 'src/permission'

const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [loginMessage, setLoginMessage] = useState('Đăng nhập thất bại')
  const [isLoading, setIsLoading] = useState(false)
  const [cookie, setCookie] = useCookies([])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInvalidLogin(false)
    setIsLoading(true)
    axios
      .post(`${process.env.REACT_APP_STRAPI_URL}/api/auth/local`, {
        identifier: username,
        password: password,
      })
      .then(async (response) => {
        setIsLoading(false)
        setCookie(process.env.REACT_APP_COOKIE_NAME, response.data.jwt, {
          path: '/',
          expires: new Date(Date.now() + 16 * 60 * 60 * 1000),
          secure: true,
          sameSite: 'strict',
        })
        const permissionsData = await getPermissionsData()
        setCookie(process.env.REACT_APP_COOKIE_PERMISSION_NAME, permissionsData, {
          path: '/',
          expires: new Date(Date.now() + 16 * 60 * 60 * 1000),
          secure: true,
          sameSite: 'strict',
        })
      })
      .catch((error) => {
        try {
          setLoginMessage(error.response.data.error.message)
        } catch (e) {
          setLoginMessage('Đăng nhập thất bại')
        } finally {
          setInvalidLogin(true)
          setIsLoading(false)
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>
                    <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
                    <CAlert
                      color="danger"
                      dismissible
                      visible={invalidLogin}
                      onClose={() => setInvalidLogin(false)}
                    >
                      {loginMessage}
                    </CAlert>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleUsernameChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isLoading}
                        >
                          {!isLoading ? 'Đăng nhập' : 'Loading...'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Quên mật khẩu ?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Chuỗi cửa hàng vải lẻ</h2>
                    <p> Hệ thống quản lý cho chuỗi cửa hàng vải lẻ </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Signin
