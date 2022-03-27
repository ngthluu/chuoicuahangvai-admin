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

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [branch, setBranch] = useState('')
  const [branchName, setBranchName] = useState('')
  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')

  const handleDeleteSKU = (id) => {
    setProducts(products.filter((value) => value.id !== id))
  }

  const handleAddSKU = (skuItem) => {
    const productSkuId = skuItem.id
    const productSku = skuItem.attributes.sku
    const productName = skuItem.attributes.product.data.attributes.name

    let newProducts = [...products]
    let addFlag = true
    newProducts.forEach((value) => {
      if (value.id === productSkuId) {
        value.quantity += 1
        addFlag = false
      }
    })
    if (addFlag) {
      newProducts.push({
        componentId: null,
        id: productSkuId,
        sku: productSku,
        name: productName,
        quantity: 1,
      })
    }
    setProducts(newProducts)
  }

  const handleChangeQuantity = (index, value) => {
    let newProducts = [...products]
    newProducts[index].quantity = parseInt(value)
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
          new_quantity: 0,
          quantity: item.quantity,
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
          const errorMesaage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMesaage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMesaage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMesaage}!!`)
        })
    }
  }

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        fields: ['id', 'note'],
        populate: {
          branch: { fields: ['id', 'name'] },
          products: {
            fields: ['quantity'],
            populate: {
              sku: {
                fields: ['sku'],
                populate: {
                  product: {
                    fields: ['name'],
                  },
                },
              },
            },
          },
        },
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
        return {
          componentId: item.id,
          id: item.sku.data.id,
          sku: item.sku.data.attributes.sku,
          name: item.sku.data.attributes.product.data.attributes.name,
          quantity: item.quantity,
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
                <CFormLabel>Kho</CFormLabel>
                <InputDropdownSearch
                  placeholder="Tìm kiếm kho"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ name: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.attributes.name}`}
                  handleNotFound={() => toast.error('Không tìm thấy kho này !!!')}
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
                ajaxDataPopulate={['product', 'pattern', 'stretch', 'width', 'origin', 'images']}
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
                <CTable align="middle" responsive bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
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
                            onClick={() => handleDeleteSKU(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="3"> Tổng giá trị </CTableHeaderCell>
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
