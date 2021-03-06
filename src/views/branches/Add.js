import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

import SelectFetchData from 'src/views/template/SelectFetchData'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState(0)
  const [address, setAddress] = useState('')
  const [manager, setManager] = useState('')

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }

    const formData = Object.fromEntries(new FormData(form).entries())
    let data = {
      name: formData.name,
      address: {
        address: formData.address,
        address_three_levels: formData.ward,
      },
    }
    if (formData.manager !== '') {
      data = { ...data, manager: formData.manager }
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/branches`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/branches/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
    }
  }

  // For edit
  const fetchBranchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      { populate: ['address', 'address.address_three_levels', 'manager'] },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/branches/${id}?${query}`)
    const data = response.data.data
    setName(data.attributes.name)
    setCity(data.attributes.address.address_three_levels.data.attributes.city)
    setDistrict(data.attributes.address.address_three_levels.data.attributes.district)
    setWard(data.attributes.address.address_three_levels.data.id)
    setAddress(data.attributes.address.address)
    setManager(data.attributes.manager.data ? data.attributes.manager.data.id : '')
  }

  useEffect(() => {
    async function fetchData() {
      fetchBranchData()
    }
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
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm cửa hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Tên cửa hàng (*)</CFormLabel>
                <CFormInput
                  defaultValue={name}
                  name="name"
                  type="text"
                  placeholder="Nhập tên cửa hàng"
                  required
                />
                <CFormFeedback invalid>Hãy nhập tên cửa hàng!</CFormFeedback>
              </CCol>
            </CRow>
            <Address city={city} district={district} ward={ward} address={address}></Address>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Nhân viên quản lý</CFormLabel>
                <SelectFetchData
                  name="manager"
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/user?filters[role][name]=Branch%20Manager`}
                  value={manager}
                  setValue={setManager}
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.email }
                    })
                  }}
                ></SelectFetchData>
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
