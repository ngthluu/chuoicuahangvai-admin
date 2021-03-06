import React, { useState } from 'react'
import axios from 'axios'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import SelectFetchData from 'src/views/template/SelectFetchData'
import ImageUploadList from 'src/views/template/ImageUploadList'

import PropTypes from 'prop-types'

const SkuBox = (props) => {
  const [imagesList, setImagesList] = useState(props.images)
  const handleChangeSKU = (e) => {
    let data = [...props.data]
    data[props.index].attributes.sku = e.target.value
    props.setData(data)
  }
  const handleChangePrice = (e) => {
    let data = [...props.data]
    data[props.index].attributes.price = e.target.value
    props.setData(data)
  }
  const handleChangeColor = (e) => {
    let data = [...props.data]
    if (data[props.index].attributes.color.data == null) {
      data[props.index].attributes.color.data = { id: null }
    }
    data[props.index].attributes.color.data.id = e
    props.setData(data)
  }
  const handleChangePattern = (e) => {
    let data = [...props.data]
    if (data[props.index].attributes.pattern.data == null) {
      data[props.index].attributes.pattern.data = { id: null }
    }
    data[props.index].attributes.pattern.data.id = e
    props.setData(data)
  }
  const handleChangeWidth = (e) => {
    let data = [...props.data]
    if (data[props.index].attributes.width.data == null) {
      data[props.index].attributes.width.data = { id: null }
    }
    data[props.index].attributes.width.data.id = e
    props.setData(data)
  }
  const handleChangeStretch = (e) => {
    let data = [...props.data]
    if (data[props.index].attributes.stretch.data == null) {
      data[props.index].attributes.stretch.data = { id: null }
    }
    data[props.index].attributes.stretch.data.id = e
    props.setData(data)
  }
  const handleChangeOrigin = (e) => {
    let data = [...props.data]
    if (data[props.index].attributes.origin.data == null) {
      data[props.index].attributes.origin.data = { id: null }
    }
    data[props.index].attributes.origin.data.id = e
    props.setData(data)
  }

  const handleDeleteSKU = async (e) => {
    if (props.id !== null) {
      await axios
        .delete(`${process.env.REACT_APP_STRAPI_URL}/api/product-skus/${props.id}`)
        .then((response) => props.triggerDeleteSuccess())
        .catch((error) => props.triggerDeleteError())
    }
    props.setData([...props.data.slice(0, props.index), ...props.data.slice(props.index + 1)])
  }

  return (
    <CCol md={6} className="mb-3">
      <CCard className="border-info">
        <CCardHeader>
          <CButton type="button" className="float-end" color="danger" onClick={handleDeleteSKU}>
            <FontAwesomeIcon icon={faTimes} color="white" />
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>H??nh ???nh</CFormLabel>
              <ImageUploadList
                data={imagesList}
                setData={(images) => {
                  setImagesList(images)
                  props.data[props.index].attributes.images.data = images
                }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>SKU</CFormLabel>
              <CFormInput
                defaultValue={props.sku}
                value={props.sku}
                onChange={handleChangeSKU}
                type="text"
                placeholder="SKU"
                required
              />
              <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>????n gi??</CFormLabel>
              <CFormInput
                defaultValue={props.price}
                value={props.price}
                onChange={handleChangePrice}
                type="number"
                placeholder="????n gi??"
                required
              />
              <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel>M??u s???c</CFormLabel>
              <SelectFetchData
                name={`color[${props.index}]`}
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-colors`}
                value={props.color}
                setValue={handleChangeColor}
                processFetchDataResponse={(response) => {
                  return response.data.data.map((item) => {
                    return { id: item.id, name: item.attributes.name }
                  })
                }}
              ></SelectFetchData>
              <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Ki???u m???u</CFormLabel>
              <SelectFetchData
                name={`pattern[${props.index}]`}
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-patterns`}
                value={props.pattern}
                setValue={handleChangePattern}
                processFetchDataResponse={(response) => {
                  return response.data.data.map((item) => {
                    return { id: item.id, name: item.attributes.name }
                  })
                }}
              ></SelectFetchData>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Chi???u r???ng</CFormLabel>
              <SelectFetchData
                name={`width[${props.index}]`}
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-widths`}
                value={props.width}
                setValue={handleChangeWidth}
                processFetchDataResponse={(response) => {
                  return response.data.data.map((item) => {
                    return { id: item.id, name: item.attributes.name }
                  })
                }}
              ></SelectFetchData>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6} className="mb-3">
              <CFormLabel>Co gi??n</CFormLabel>
              <SelectFetchData
                name={`stretch[${props.index}]`}
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
                value={props.stretch}
                setValue={handleChangeStretch}
                processFetchDataResponse={(response) => {
                  return response.data.data.map((item) => {
                    return { id: item.id, name: item.attributes.name }
                  })
                }}
              ></SelectFetchData>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Xu???t x???</CFormLabel>
              <SelectFetchData
                name={`origin[${props.index}]`}
                url={`${process.env.REACT_APP_STRAPI_URL}/api/product-origins`}
                value={props.origin}
                setValue={handleChangeOrigin}
                processFetchDataResponse={(response) => {
                  return response.data.data.map((item) => {
                    return { id: item.id, name: item.attributes.name }
                  })
                }}
              ></SelectFetchData>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

SkuBox.propTypes = {
  id: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.string,
  color: PropTypes.string,
  origin: PropTypes.string,
  width: PropTypes.string,
  stretch: PropTypes.string,
  pattern: PropTypes.string,
  images: PropTypes.array,
  index: PropTypes.number,
  data: PropTypes.array,
  setData: PropTypes.func,
  triggerDeleteSuccess: PropTypes.func,
  triggerDeleteError: PropTypes.func,
}

export default SkuBox
