import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormFeedback,
  CCard,
  CCardBody,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ImageUpload from 'src/views/template/ImageUpload'

const SkuBox = () => {
  const [imagesList, setImagesList] = useState([])
  const addProductImage = () => {
    let newImagesList = [...imagesList, '']
    setImagesList(newImagesList)
  }

  return (
    <CCol md={6} className="mb-3">
      <CCard className="border-info">
        <CCardBody>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>Hình ảnh</CFormLabel>
              <div>
                {imagesList.map((item, index) => (
                  <ImageUpload key="" name="a"></ImageUpload>
                ))}
                <CCard
                  className="p-2 mb-3 d-flex justify-content-center align-items-center"
                  onClick={addProductImage}
                  role="button"
                  color="info"
                  textColor="white"
                >
                  <div>
                    <FontAwesomeIcon icon={faPlus} /> <strong>Hình ảnh</strong>
                  </div>
                </CCard>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>SKU</CFormLabel>
              <CFormInput type="text" placeholder="SKU" />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>Đơn giá</CFormLabel>
              <CFormInput type="number" placeholder="Đơn giá" />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>Màu sắc (RGB)</CFormLabel>
              <CFormInput type="text" placeholder="Màu sắc (RGB)" />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Kiểu mẫu</CFormLabel>
              <CFormSelect options={['Chọn kiểu mẫu']} required></CFormSelect>
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Chiều rộng</CFormLabel>
              <CFormSelect options={['Chọn chiều rộng']} required></CFormSelect>
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Co giãn</CFormLabel>
              <CFormSelect options={['Chọn co giãn']} required></CFormSelect>
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Xuất xứ</CFormLabel>
              <CFormSelect options={['Chọn xuất xứ']} required></CFormSelect>
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default SkuBox
