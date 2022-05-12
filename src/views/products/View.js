import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CCardFooter,
  CButton,
  CFormFeedback,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextEditor from 'src/views/template/TextEditor'
import SkuBox from './SkuBox'
import SelectFetchData from 'src/views/template/SelectFetchData'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ImageUploadList from '../template/ImageUploadList'

const View = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [color, setColor] = useState('')
  const [origin, setOrigin] = useState('')
  const [width, setWidth] = useState('')
  const [stretch, setStretch] = useState('')
  const [pattern, setPattern] = useState('')
  const [images, setImages] = useState([])

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'images',
          'product',
          'product.category',
          'pattern',
          'width',
          'stretch',
          'origin',
          'color',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/product-skus/${id}?${query}`)
    const data = response.data.data
    const productData = data.attributes.product.data
    const categoryData = productData ? productData.attributes.category.data : null
    const colorData = data.attributes.color.data
    const originData = data.attributes.origin.data
    const widthData = data.attributes.width.data
    const stretchData = data.attributes.stretch.data
    const patternData = data.attributes.pattern.data
    const imagesData = data.attributes.images.data
    setName(productData ? productData.attributes.name : '')
    setCategory(categoryData ? categoryData.attributes.id : '')
    setDescription(productData ? productData.attributes.description : '')
    setSku(data.attributes.sku)
    setPrice(data.attributes.price)
    setColor(colorData ? colorData.id : '')
    setOrigin(originData ? originData.id : '')
    setWidth(widthData ? widthData.id : '')
    setStretch(stretchData ? stretchData.id : '')
    setPattern(patternData ? patternData.id : '')
    setImages(imagesData ? imagesData : [])
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <ToastContainer />
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Hình ảnh</CFormLabel>
                <ImageUploadList
                  view={true}
                  data={images}
                  setData={(images) => setImages(images)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>SKU</CFormLabel>
                <CFormInput value={sku} type="text" placeholder="SKU" required />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Tên sản phẩm</CFormLabel>
                <CFormInput value={name} type="text" placeholder="Tên sản phẩm" required />
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
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.attributes.name }
                    })
                  }}
                ></SelectFetchData>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Đơn giá</CFormLabel>
                <CFormInput value={price} type="number" placeholder="Đơn giá" required />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Màu sắc</CFormLabel>
                <SelectFetchData
                  name={`color`}
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-colors`}
                  value={color}
                  setValue={() => {}}
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.attributes.name }
                    })
                  }}
                ></SelectFetchData>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Kiểu mẫu</CFormLabel>
                <SelectFetchData
                  name={`pattern`}
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-patterns`}
                  value={pattern}
                  setValue={() => {}}
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.attributes.name }
                    })
                  }}
                ></SelectFetchData>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Chiều rộng</CFormLabel>
                <SelectFetchData
                  name={`width`}
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-widths`}
                  value={width}
                  setValue={() => {}}
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
                <CFormLabel>Co giãn</CFormLabel>
                <SelectFetchData
                  name={`stretch`}
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
                  value={stretch}
                  setValue={() => {}}
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.attributes.name }
                    })
                  }}
                ></SelectFetchData>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Xuất xứ</CFormLabel>
                <SelectFetchData
                  name={`origin`}
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/product-origins`}
                  value={origin}
                  setValue={() => {}}
                  processFetchDataResponse={(response) => {
                    return response.data.data.map((item) => {
                      return { id: item.id, name: item.attributes.name }
                    })
                  }}
                ></SelectFetchData>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Mô tả</CFormLabel>
                <TextEditor value={description} setValue={setDescription}></TextEditor>
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
    </>
  )
}

export default View
