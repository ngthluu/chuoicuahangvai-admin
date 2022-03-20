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
  CFormSelect,
  CCardFooter,
  CButton,
  CFormFeedback,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [parentCategories, setParentCategories] = useState([])
  const fetchParentCategoriesData = async () => {
    const query = qs.stringify({}, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/product-categories?${query}`,
    )
    setParentCategories(response.data.data)
  }
  useEffect(() => {
    async function fetchData() {
      fetchParentCategoriesData()
      fetchCategoryData()
    }
    fetchData()
  }, [])

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }

    const formData = Object.fromEntries(new FormData(form).entries())
    const data = {
      name: formData.name,
      parent: formData.parent === '' ? null : formData.parent,
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/product-categories`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
    } else {
      axios
        .put(`${process.env.REACT_APP_API_ENDPOINT}/product-categories/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
    }
  }

  // Edit stuffs
  const [name, setName] = useState('')
  const [parent, setParent] = useState('')
  const handleChangeParent = (e) => {
    e.preventDefault()
    let parent = document.getElementsByName('parent')[0]
    parent = parent.options[parent.selectedIndex].value
    setParent(parent)
  }
  const fetchCategoryData = async () => {
    if (id === null) return
    const query = qs.stringify({ populate: ['parent'] }, { encodeValuesOnly: true })
    const response = await axios.get(`
      ${process.env.REACT_APP_API_ENDPOINT}/product-categories/${id}?${query}`)
    const data = response.data.data
    setName(data.attributes.name)
    setParent(data.attributes.parent.data !== null ? data.attributes.parent.data.id : '')
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm danh mục</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Tên (*)</CFormLabel>
                <CFormInput
                  defaultValue={name}
                  name="name"
                  type="text"
                  placeholder="Tên"
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Danh mục cha</CFormLabel>
                <CFormSelect value={parent} name="parent" required onChange={handleChangeParent}>
                  <option disabled>Chọn danh mục cha</option>
                  <option value="">Không có</option>
                  {parentCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.attributes.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/categories" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
