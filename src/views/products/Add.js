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
import SelectFetchData from 'src/views/template/SelectFetchData'

const Add = () => {
  const [skus, setSkus] = useState([])
  const addSKU = () => {
    setSkus([...skus, ''])
  }
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Tên sản phẩm</CFormLabel>
                <CFormInput type="text" placeholder="Tên sản phẩm" required />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Danh mục</CFormLabel>
                <SelectFetchData
                  name="category"
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-categories`}
                  value={category}
                  setValue={setCategory}
                ></SelectFetchData>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Mô tả</CFormLabel>
                <TextEditor setValue={setDescription}></TextEditor>
              </CCol>
            </CRow>
            <CRow>
              {skus.map((item, index) => (
                <SkuBox key={index}></SkuBox>
              ))}
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
