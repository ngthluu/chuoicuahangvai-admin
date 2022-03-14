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

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }
    setValidated(true)
    const formData = Object.fromEntries(new FormData(form).entries())
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/branches`, {
        data: {
          name: formData.name,
          address: {
            address: formData.address,
            address_three_levels: formData.ward,
          },
          manager: formData.manager,
        },
      })
      .then((response) => toast.success('Thao tác thành công'))
      .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
  }

  // Fetch managers data
  const [managers, setManagers] = useState([])
  const fetchManagersData = async () => {
    const query = qs.stringify(
      {
        fields: ['id', 'username'],
        filters: {
          role: {
            name: 'Branch Manager',
          },
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users?${query}`)
    const data = []
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
      <ToastContainer />
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm cửa hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Tên cửa hàng (*)</CFormLabel>
                <CFormInput name="name" type="text" placeholder="Nhập tên cửa hàng" required />
                <CFormFeedback invalid>Hãy nhập tên cửa hàng!</CFormFeedback>
              </CCol>
            </CRow>
            <Address></Address>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Nhân viên quản lý</CFormLabel>
                <CFormSelect name="manager" required>
                  <option disabled>Chọn nhân viên quản lý</option>
                  {managers.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>Hãy chọn quản lý chi nhánh!</CFormFeedback>
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
