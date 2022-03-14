import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Address from '../template/Address'

const Add = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }

  // Fetch managers data
  const [managers, setManagers] = useState([])
  const fetchManagersData = async () => {
    const query = qs.stringify(
      {
        fields: ['id', 'username'],
        filters: {
          branch: {
            name: {
              $null: true,
            },
          },
          role: {
            name: 'Branch Manager',
          },
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users?${query}`)
    const data = ['Chọn nhân viên quản lý']
    response.data.forEach((item) => {
      data.push({ value: item.id, label: item.username })
    })
    setManagers(data)
  }

  useEffect(() => {
    fetchManagersData()
  }, [])

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm cửa hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Tên cửa hàng (*)</CFormLabel>
                <CFormInput type="text" placeholder="Nhập tên cửa hàng" required />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <Address></Address>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Nhân viên quản lý</CFormLabel>
                <CFormSelect options={managers} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/branches" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
