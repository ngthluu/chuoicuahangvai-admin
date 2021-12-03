import React from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCardFooter,
  CButton,
} from '@coreui/react'

const View = (props) => {
  return (
    <CRow>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm chi nhánh</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Tên chi nhánh</CFormLabel>
                <CFormInput type="text" placeholder="Nhập tên chi nhánh" readOnly />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Tỉnh / Thành phố</CFormLabel>
                <CFormSelect options={['Chọn tỉnh / thành phố']} readOnly></CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Quận / Huyện</CFormLabel>
                <CFormSelect options={['Chọn quận / huyện']} readOnly></CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Phường / Xã</CFormLabel>
                <CFormSelect options={['Chọn phường / xã']} readOnly></CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Địa chỉ</CFormLabel>
                <CFormInput type="text" placeholder="Nhập địa chỉ" readOnly />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Nhân viên quản lý</CFormLabel>
                <CFormSelect options={['Chọn nhân viên quản lý']} readOnly></CFormSelect>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton href="/branches" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default View
