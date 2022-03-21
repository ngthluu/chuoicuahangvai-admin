import React, { useState } from 'react'
import { CRow, CCol, CFormLabel, CFormInput, CFormFeedback, CCard, CCardBody } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ImageUpload from 'src/views/template/ImageUpload'
import SelectFetchData from 'src/views/template/SelectFetchData'

import PropTypes from 'prop-types'

const SkuBox = (props) => {
  const [imagesList, setImagesList] = useState(props.images)
  const addProductImage = () => {
    let newImagesList = [
      ...imagesList,
      {
        id: null,
        attributes: {
          url: null,
        },
      },
    ]
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
                  <ImageUpload key="" name="a" default={item.attributes.url}></ImageUpload>
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
              <CFormInput defaultValue={props.sku} type="text" placeholder="SKU" required />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>Đơn giá</CFormLabel>
              <CFormInput defaultValue={props.price} type="number" placeholder="Đơn giá" required />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>Màu sắc (RGB)</CFormLabel>
              <CFormInput
                defaultValue={props.color}
                type="text"
                placeholder="Màu sắc (RGB)"
                required
              />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Kiểu mẫu</CFormLabel>
              <SelectFetchData
                name="pattern[]"
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-patterns`}
                value={props.pattern}
                setValue={() => {}}
              ></SelectFetchData>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Chiều rộng</CFormLabel>
              <SelectFetchData
                name="width[]"
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-widths`}
                value={props.width}
                setValue={() => {}}
              ></SelectFetchData>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Co giãn</CFormLabel>
              <SelectFetchData
                name="stretch[]"
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
                value={props.stretch}
                setValue={() => {}}
              ></SelectFetchData>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Xuất xứ</CFormLabel>
              <SelectFetchData
                name="origin[]"
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-origins`}
                value={props.origin}
                setValue={() => {}}
              ></SelectFetchData>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

SkuBox.propTypes = {
  sku: PropTypes.string,
  price: PropTypes.string,
  color: PropTypes.string,
  origin: PropTypes.string,
  width: PropTypes.string,
  stretch: PropTypes.string,
  pattern: PropTypes.string,
  images: PropTypes.array,
}

export default SkuBox
