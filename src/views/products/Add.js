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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextEditor from 'src/views/template/TextEditor'
import SkuBox from './SkuBox'

const Add = () => {
  const [skus, setSkus] = useState([])
  const addSKU = () => {
    setSkus([...skus, ''])
  }

  const [description, setDescription] = useState('')

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Tên sản phẩm</CFormLabel>
                <CFormInput type="text" placeholder="Tên sản phẩm" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Danh mục</CFormLabel>
                <CFormSelect options={['Chọn màu sắc']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Mô tả</CFormLabel>
                <TextEditor setValue={setDescription}></TextEditor>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CCard
                  className="p-2 mb-3 d-flex justify-content-center align-items-center"
                  onClick={addSKU}
                  role="button"
                  color="info"
                  textColor="white"
                >
                  <div>
                    <FontAwesomeIcon icon={faPlus} /> <strong>SKU</strong>
                  </div>
                </CCard>
              </CCol>
              {skus.map((item, index) => (
                <SkuBox key={index}></SkuBox>
              ))}
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/products" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
