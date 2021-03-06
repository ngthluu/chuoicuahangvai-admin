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

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [skus, setSkus] = useState([])
  const addSKU = () => {
    setSkus([
      ...skus,
      {
        id: null,
        attributes: {
          sku: '',
          price: '',
          color: { data: null },
          origin: { data: null },
          width: { data: null },
          stretch: { data: null },
          pattern: { data: null },
          images: { data: null },
        },
      },
    ])
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }

    const data = {
      name: name,
      category: category,
      description: description,
      skus: skus,
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/products`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/products/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    }
  }

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        fields: ['id', 'name', 'description'],
        populate: {
          category: { fields: ['id'] },
          product_skus: {
            fields: ['sku', 'price'],
            populate: {
              color: { fields: ['id'] },
              pattern: { fields: ['id'] },
              stretch: { fields: ['id'] },
              width: { fields: ['id'] },
              origin: { fields: ['id'] },
              images: { fields: ['id', 'url'] },
            },
          },
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/products/${id}?${query}`)
    const data = response.data.data
    setName(data.attributes.name)
    setCategory(`${data.attributes.category.data ? data.attributes.category.data.id : ''}`)
    setDescription(data.attributes.description)
    setSkus(data.attributes.product_skus.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Tên sản phẩm</CFormLabel>
                <CFormInput
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  type="text"
                  placeholder="Tên sản phẩm"
                  required
                />
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
                <CFormLabel>Mô tả</CFormLabel>
                <TextEditor value={description} setValue={setDescription}></TextEditor>
              </CCol>
            </CRow>
            <CRow>
              {skus.map((item, index) => (
                <SkuBox
                  key={index}
                  index={index}
                  data={skus}
                  setData={setSkus}
                  id={item.id}
                  sku={item.attributes.sku}
                  price={item.attributes.price}
                  color={item.attributes.color.data ? item.attributes.color.id : ''}
                  origin={item.attributes.origin.data ? item.attributes.origin.data.id : ''}
                  width={item.attributes.width.data ? item.attributes.width.data.id : ''}
                  stretch={item.attributes.stretch.data ? item.attributes.stretch.data.id : ''}
                  pattern={item.attributes.pattern.data ? item.attributes.pattern.data.id : ''}
                  images={item.attributes.images.data ? item.attributes.images.data : []}
                  triggerDeleteSuccess={() => toast.success('Xóa SKU thành công')}
                  triggerDeleteError={() => toast.error(`Xóa thất bại.`)}
                ></SkuBox>
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
