import React from 'react'
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
  CFormCheck,
  CImage,
} from '@coreui/react'

import PropTypes from 'prop-types'
import ImageUpload from 'src/views/template/ImageUpload'

const ShiftComponent = (props) => {
  return (
    <div className="mb-3">
      <strong>{props.title}</strong>
      <div>
        <CFormCheck type="checkbox" inline label="Ca sáng" />
        <CFormCheck type="checkbox" inline label="Ca chiều" />
        <CFormCheck type="checkbox" inline label="Ca tối" />
      </div>
    </div>
  )
}
ShiftComponent.propTypes = {
  title: PropTypes.string,
}

const View = () => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin khách hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <ImageUpload name="avatar"></ImageUpload>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mã số</CFormLabel>
                <CFormInput type="text" readOnly />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Họ và tên</CFormLabel>
                <CFormInput type="text" placeholder="Nhập tên khách hàng" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput type="text" placeholder="Nhập email" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Số điện thoại</CFormLabel>
                <CFormInput type="text" placeholder="Nhập số điện thoại" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Tỉnh / thành phố</CFormLabel>
                <CFormInput type="text" placeholder="Nhập tỉnh / thành phố" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Quận / huyện</CFormLabel>
                <CFormInput type="text" placeholder="Nhập quận / huyện" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Phường / xã</CFormLabel>
                <CFormInput type="text" placeholder="Nhập phường / xã" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Địa chỉ</CFormLabel>
                <CFormInput type="text" placeholder="Nhập địa chỉ" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton href="/customers" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default View
