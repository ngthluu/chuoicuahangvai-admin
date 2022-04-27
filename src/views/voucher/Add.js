import React, { useState } from 'react'
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

const Add = () => {
  const getTypeText = (value) => {
    switch (value) {
      case 'percent':
        return 'Giảm giá tổng đơn hàng (%)'
      case 'percent_limit':
        return 'Giảm giá tổng đơn hàng, có giới hạn số tiền giảm (%)'
      case 'amount':
        return 'Giảm giá tổng đơn hàng (đ)'
      default:
        return ''
    }
  }
  const getApplyForText = (value) => {
    switch (value) {
      case 'new_customers':
        return `Khách hàng mới (đăng kí 1 tháng)`
      case 'all_customers_limit_quantity':
        return `Tất cả khách hàng, giới hạn vouchers`
      default:
        return ''
    }
  }

  const [typeValue, setTypeValue] = useState('{}')

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mã số</CFormLabel>
                <CFormInput type="text" placeholder="Mã số" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <AddTypes data={typeValue} setData={setTypeValue}></AddTypes>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Áp dụng cho</CFormLabel>
                <CFormSelect>
                  <option value="">Không có</option>
                  <option value="new_customers">{getApplyForText('new_customers')}</option>
                  <option value="all_customers_limit_quantity">
                    {getApplyForText('all_customers_limit_quantity')}
                  </option>
                </CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Ngày bắt đầu áp dụng</CFormLabel>
                <CFormInput type="date" placeholder="Ngày bắt đầu áp dụng" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Ngày kết thúc</CFormLabel>
                <CFormInput type="date" placeholder="Ngày kết thúc" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton
              color="info"
              type="button"
              className="text-white"
              onClick={(e) => console.log(typeValue)}
            >
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
