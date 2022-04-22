import React, { useState, useEffect } from 'react'
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
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextEditor from 'src/views/template/TextEditor'

import ImageUploadList from 'src/views/template/ImageUploadList'
import HomepageFeaturesSku from 'src/views/content/HomepageFeaturesSku'
import HomepageCustomerResponse from 'src/views/content/HomepageCustomerResponse'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const [headerBanner, setHeaderBanner] = useState('')
  const [newProductsBanners, setNewProductsBanners] = useState([])

  const [featuresSku, setFeaturesSku] = useState([])
  const [memberResponses, setMemberResponses] = useState([])
  const [signupSection, setSignupSection] = useState('')

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
      header_banner: headerBanner,
      new_products_banners: newProductsBanners,
      features_sku: featuresSku,
      member_responses: memberResponses.map((item) => ({
        ...item,
        avatar: item.avatar.data ? item.avatar.data.id : null,
      })),
      signup_section: signupSection,
    }
    axios
      .put(`${process.env.REACT_APP_STRAPI_URL}/api/homepage`, {
        data: data,
      })
      .then((response) => toast.success('Thao tác thành công'))
      .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
  }

  const fetchData = async () => {
    const query = qs.stringify(
      {
        populate: [
          'member_responses',
          'member_responses.avatar',
          'features_sku',
          'features_sku.product',
          'features_sku.color',
          'features_sku.pattern',
          'features_sku.stretch',
          'features_sku.width',
          'features_sku.origin',
          'new_products_banners',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/homepage?${query}`)
    const data = response.data.data
    setHeaderBanner(data.attributes.header_banner)
    setNewProductsBanners(
      data.attributes.new_products_banners.data ? data.attributes.new_products_banners.data : [],
    )
    setFeaturesSku(
      data.attributes.features_sku.data
        ? data.attributes.features_sku.data.map((item) => {
            const productSku = item.attributes.sku
            const productName = item.attributes.product.data.attributes.name
            const productAttributes = item.attributes
            return {
              componentId: item.id,
              id: item.id,
              sku: productSku,
              name: productName,
              attributes: productAttributes,
            }
          })
        : [],
    )
    setMemberResponses(data.attributes.member_responses ? data.attributes.member_responses : [])
    setSignupSection(data.attributes.signup_section)
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Header banner</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Header banner"
                  value={headerBanner}
                  onChange={(e) => setHeaderBanner(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Banner sản phẩm mới</CFormLabel>
                <ImageUploadList data={newProductsBanners} setData={setNewProductsBanners} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Sản phẩm đặc sắc</CFormLabel>
                <HomepageFeaturesSku data={featuresSku} setData={setFeaturesSku} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Phản hồi từ khách hàng</CFormLabel>
                <HomepageCustomerResponse data={memberResponses} setData={setMemberResponses} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Đăng ký nhận bản tin</CFormLabel>
                <TextEditor value={signupSection} setValue={setSignupSection}></TextEditor>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Home
