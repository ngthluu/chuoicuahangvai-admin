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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
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

const Add = () => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin nhân viên</h5>
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
                <CFormInput type="text" placeholder="Nhập tên nhân viên" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Số điện thoại</CFormLabel>
                <CFormInput type="text" placeholder="Nhập số điện thoại" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Cửa hàng</CFormLabel>
                <CFormSelect options={['Chọn cửa hàng']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Chức vụ</CFormLabel>
                <CFormSelect options={['Chọn chức vụ']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mức lương (theo ca)</CFormLabel>
                <CFormInput type="number" placeholder="Nhập mức lương" />
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
      <CCol md={5}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Ca trực</h5>
          </CCardHeader>
          <CCardBody>
            <ShiftComponent title="Thứ hai" />
            <ShiftComponent title="Thứ ba" />
            <ShiftComponent title="Thứ tư" />
            <ShiftComponent title="Thứ năm" />
            <ShiftComponent title="Thứ sáu" />
            <ShiftComponent title="Thứ bảy" />
            <ShiftComponent title="Chủ nhật" />
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
