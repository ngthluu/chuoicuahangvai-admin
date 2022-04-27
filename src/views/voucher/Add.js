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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import AddTypes from './AddTypes'
import AddApplyFor from './AddApplyFor'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [code, setCode] = useState('')

  const [type, setType] = useState('')
  const [typeValue, setTypeValue] = useState('{}')

  const [applyFor, setApplyFor] = useState('')
  const [applyForValue, setApplyForValue] = useState('{}')

  const [applyFrom, setApplyFrom] = useState('')
  const [applyTo, setApplyTo] = useState('')

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
      code: code,
      type: type,
      type_value: typeValue,
      apply_for: applyFor,
      apply_for_value: applyForValue,
      available_start_date: applyFrom,
      available_end_date: applyTo,
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/vouchers`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/vouchers/${id}`, {
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
    const query = qs.stringify({}, { encodeValuesOnly: true })
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/vouchers/${id}?${query}`)
    const data = response.data.data

    setCode(data.attributes.code)
    setType(data.attributes.type)
    setTypeValue(JSON.stringify(data.attributes.type_value))
    setApplyFor(data.attributes.apply_for)
    setApplyForValue(JSON.stringify(data.attributes.apply_for_value))
    setApplyFrom(data.attributes.available_start_date)
    setApplyTo(data.attributes.available_end_date)
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mã số</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Mã số"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <AddTypes
              data={type}
              setData={setType}
              valueData={typeValue}
              setValueData={setTypeValue}
            ></AddTypes>
            <AddApplyFor
              data={applyFor}
              setData={setApplyFor}
              valueData={applyForValue}
              setValueData={setApplyForValue}
            ></AddApplyFor>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Ngày bắt đầu áp dụng</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày bắt đầu áp dụng"
                  value={applyFrom}
                  onChange={(e) => setApplyFrom(e.target.value)}
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Ngày kết thúc</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Ngày kết thúc"
                  value={applyTo}
                  onChange={(e) => setApplyTo(e.target.value)}
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/voucher" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
