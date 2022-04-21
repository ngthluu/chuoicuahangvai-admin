import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
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
  CFormTextarea,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import InputDropdownSearch from 'src/views/template/InputDropdownSearch'
import ProductDescription from 'src/views/products/ProductDescription'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [branch, setBranch] = useState('')
  const [branchName, setBranchName] = useState('')
  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')

  const handleDelete = (index) => {
    let newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  const handleAddSKU = (skuItem) => {
    const productSkuId = skuItem.id
    if (productSkuId === '') return
    if (products.filter((item) => item.id === productSkuId).length > 0) return

    const productSku = skuItem.attributes.sku
    const productName = skuItem.attributes.product.data.attributes.name
    const productAttributes = skuItem.attributes

    let newProducts = [...products]
    newProducts.push({
      componentId: null,
      id: productSkuId,
      sku: productSku,
      name: productName,
      attributes: productAttributes,
      quantity: 1,
      length: 0,
    })
    setProducts(newProducts)
  }

  const handleChangeQuantity = (index, value) => {
    let newProducts = [...products]
    newProducts[index].quantity = parseInt(value)
    setProducts(newProducts)
  }

  const handleChangeLength = (index, value) => {
    let newProducts = [...products]
    newProducts[index].length = parseInt(value)
    setProducts(newProducts)
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
      branch: { id: branch },
      note: note,
      products: products.map((item) => {
        let data = {
          sku: { id: item.id },
          quantity: item.quantity,
          length: item.length,
        }
        if (item.componentId != null) {
          data.id = item.componentId
        }
        return data
      }),
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports/${id}`, {
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
        populate: [
          'branch',
          'products',
          'products.sku',
          'products.sku.product',
          'products.sku.pattern',
          'products.sku.stretch',
          'products.sku.width',
          'products.sku.origin',
          'products.sku.images',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports/${id}?${query}`)
    const data = response.data.data

    setBranch(data.attributes.branch.data.id)
    setBranchName(data.attributes.branch.data.attributes.name)
    setProducts(
      data.attributes.products.map((item) => {
        const skuItem = item.sku.data
        const productSku = skuItem.attributes.sku
        const productName = skuItem.attributes.product.data.attributes.name
        const productAttributes = skuItem.attributes
        return {
          componentId: item.id,
          id: skuItem.id,
          sku: productSku,
          name: productName,
          attributes: productAttributes,
          quantity: item.quantity,
          length: item.length,
        }
      }),
    )
    setNote(data.attributes.note)
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
                <CFormLabel>Cửa hàng</CFormLabel>
                <InputDropdownSearch
                  placeholder="Tìm kiếm cửa hàng"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ name: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.attributes.name}`}
                  handleNotFound={() => toast.error('Không tìm thấy cửa hàng này !!!')}
                  handleFound={(item) => setBranch(item.id)}
                  setTextNameAfterFound={true}
                  defaultName={branchName}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <InputDropdownSearch
                placeholder="Tìm kiếm sản phẩm"
                ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/product-skus`}
                ajaxDataPopulate={[
                  'product',
                  'color',
                  'pattern',
                  'stretch',
                  'width',
                  'origin',
                  'images',
                ]}
                ajaxDataGetFilters={(value) => {
                  return {
                    $or: [
                      { sku: { $containsi: value } },
                      { product: { name: { $containsi: value } } },
                    ],
                  }
                }}
                ajaxDataGetItemName={(item) =>
                  `${item.attributes.product.data.attributes.name} (${item.attributes.sku})`
                }
                handleNotFound={() => toast.error('Không tìm thấy sản phẩm này !!!')}
                handleFound={(item) => handleAddSKU(item)}
              />
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài / SP (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Số lượng </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <FontAwesomeIcon icon={faTrash} />
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          <Link to="#">{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell>
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.length}
                            onChange={(e) => handleChangeLength(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            className="text-white"
                            onClick={() => handleDelete(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products.reduce((sum, item) => sum + parseInt(item.quantity), 0)
                        })()}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Ghi chú</CFormLabel>
                <CFormTextarea
                  placeholder="Nhập ghi chú"
                  rows="5"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton
              href="/warehouses/import"
              color="secondary"
              type="button"
              className="text-white ml-3"
            >
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
