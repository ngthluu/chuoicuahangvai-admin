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
  CFormTextarea,
  CImage,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons'

import sampleImage from 'src/assets/images/vue.jpg'

const View = () => {
  const [imagesList, setImagesList] = useState([sampleImage, sampleImage, sampleImage])

  const addProductImage = () => {
    console.log(sampleImage)
    let newImagesList = [...imagesList]
    newImagesList.push(sampleImage)
    setImagesList(newImagesList)
  }

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Xem sản phẩm</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {imagesList.map((item, index) => (
                <CCol key={index} md={2} className="mb-3">
                  <CImage src={item} height="90px"></CImage>
                </CCol>
              ))}
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Mã sản phẩm</CFormLabel>
                <CFormInput type="text" readOnly />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Tên sản phẩm</CFormLabel>
                <CFormInput type="text" placeholder="Tên sản phẩm" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={3} className="mb-3">
                <CFormLabel>Màu sắc</CFormLabel>
                <CFormSelect options={['Chọn màu sắc']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3} className="mb-3">
                <CFormLabel>Kiểu mẫu</CFormLabel>
                <CFormSelect options={['Chọn kiểu mẫu']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3} className="mb-3">
                <CFormLabel>Chiều rộng</CFormLabel>
                <CFormSelect options={['Chọn chiều rộng']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3} className="mb-3">
                <CFormLabel>Co giãn</CFormLabel>
                <CFormSelect options={['Chọn co giãn']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={3} className="mb-3">
                <CFormLabel>Chất liệu</CFormLabel>
                <CFormSelect options={['Chọn chất liệu']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3} className="mb-3">
                <CFormLabel>Xuất xứ</CFormLabel>
                <CFormSelect options={['Chọn xuất xứ']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3} className="mb-3">
                <CFormLabel>Cân nặng</CFormLabel>
                <CFormSelect options={['Chọn cân nặng']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3}></CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Đơn giá</CFormLabel>
                <CFormInput type="number" placeholder="Nhập đơn giá" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mô tả</CFormLabel>
                <CFormTextarea placeholder="Nhập mô tả" rows="5"></CFormTextarea>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton href="/products" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default View
