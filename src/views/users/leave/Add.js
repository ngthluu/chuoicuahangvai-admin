import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCardFooter,
  CButton,
  CFormFeedback,
  CFormTextarea,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import InputDropdownSearch from 'src/views/template/InputDropdownSearch'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [user, setUser] = useState('')
  const [userName, setUserName] = useState('')

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [note, setNote] = useState('')

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }

    const data = {
      user: { id: user },
      note: note,
      from: from,
      to: to,
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    }
  }

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify({ populate: ['user'] }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/user-leaves/${id}?${query}`,
    )
    const data = response.data.data
    setUser(data.attributes.user.data.id)
    setUserName(data.attributes.user.data.attributes.email)
    setFrom(new Date(data.attributes.from).toISOString().slice(0, -1))
    setTo(new Date(data.attributes.to).toISOString().slice(0, -1))
    setNote(data.attributes.note)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Nhân viên</CFormLabel>
                <InputDropdownSearch
                  placeholder="Tìm kiếm nhân viên"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/user`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ email: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.email}`}
                  handleNotFound={() => toast.error('Không tìm thấy nhân viên này !!!')}
                  handleFound={(item) => setUser(item.id)}
                  setTextNameAfterFound={true}
                  defaultName={userName}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Từ</CFormLabel>
                <CFormInput
                  type="datetime-local"
                  placeholder="Từ"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Đến</CFormLabel>
                <CFormInput
                  type="datetime-local"
                  placeholder="Đến"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Ghi chú</CFormLabel>
                <CFormTextarea
                  placeholder="Nhập ghi chú"
                  rows="5"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton
              href="/users/leave"
              color="secondary"
              type="button"
              className="text-white ml-3"
            >
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
