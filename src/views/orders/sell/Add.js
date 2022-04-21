import React, { useState } from 'react'
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
  CCardFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CFormFeedback,
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

  const [customerId, setCustomerId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [branch, setBranch] = useState('')
  const [branchName, setBranchName] = useState('')
  const [products, setProducts] = useState([])
  const [paymentCost, setPaymentCost] = useState(0)

  const handleDelete = (index) => {
    let newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  const handleLoadCustomerData = (customer) => {
    setCustomerId(customer.id)
    setFirstName(customer.id !== '' ? customer.name.firstname : '')
    setLastName(customer.id !== '' ? customer.name.lastname : '')
    setPhone(customer.id !== '' ? customer.phone : '')
  }

  const handleAddInventoryItem = (inventoryItem) => {
    const inventoryItemId = inventoryItem.id
    if (inventoryItemId === '') return
    if (products.filter((item) => item.id === inventoryItemId).length > 0) return

    const skuItem = inventoryItem.attributes.sku_quantity.sku.data
    const productSku = skuItem.attributes.sku
    const productName = skuItem.attributes.product.data.attributes.name
    const productAttributes = skuItem.attributes
    const currentInventoryLength = inventoryItem.attributes.sku_quantity.length

    let newProducts = [...products]
    newProducts.push({
      componentId: null,
      id: inventoryItemId,
      sku: productSku,
      name: productName,
      attributes: productAttributes,
      length: 0,
      current_length: currentInventoryLength,
    })
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
    if (products.filter((item) => item.length > item.current_length).length > 0) {
      toast.error(`Thao tác thất bại. Không thể xuất quá SL tồn kho !!`)
      return
    }

    const data = {
      branch: { id: branch },
      products: products.map((item) => {
        let data = {
          inventory_item: { id: item.id },
          length: item.length,
        }
        if (item.componentId != null) {
          data.id = item.componentId
        }
        return data
      }),
      customerId: customerId,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      paymentCost: paymentCost,
    }

    axios
      .post(`${process.env.REACT_APP_STRAPI_URL}/api/orders/create-pos`, {
        data: data,
      })
      .then((response) => toast.success('Thao tác thành công'))
      .catch((error) => {
        const errorMesaage = error.response.data.error.message
        toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMesaage}!!`)
      })
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <CCol md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Đơn hàng</h5>
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
                placeholder="Tìm kiếm cây vải trong cửa hàng"
                ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-inventories`}
                ajaxDataPopulate={[
                  'sku_quantity',
                  'sku_quantity.sku',
                  'sku_quantity.sku.product',
                  'sku_quantity.sku.color',
                  'sku_quantity.sku.pattern',
                  'sku_quantity.sku.stretch',
                  'sku_quantity.sku.width',
                  'sku_quantity.sku.origin',
                  'sku_quantity.sku.images',
                ]}
                ajaxDataGetFilters={(value) => {
                  return {
                    $and: [
                      {
                        $or: [
                          { id: { $containsi: value } },
                          { sku_quantity: { sku: { sku: { $containsi: value } } } },
                          { sku_quantity: { sku: { product: { name: { $containsi: value } } } } },
                        ],
                      },
                      {
                        branch: { id: branch === '' ? -1 : branch },
                      },
                    ],
                  }
                }}
                ajaxDataGetItemName={(item) =>
                  `#${item.id} - (${item.attributes.sku_quantity.sku.data.attributes.sku} - ${item.attributes.sku_quantity.sku.data.attributes.product.data.attributes.name}) - Còn ${item.attributes.sku_quantity.length} cm`
                }
                handleNotFound={() => toast.error('Không tìm thấy cây vải này !!!')}
                handleFound={(item) => handleAddInventoryItem(item)}
              />
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Giá (đ/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài trong kho (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài xuất (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tổng (đ) </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <FontAwesomeIcon icon={faTrash} />
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell> #{item.id} </CTableDataCell>
                        <CTableDataCell>
                          <Link to="#">{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.name}
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell> {item.attributes.price.toLocaleString()} </CTableDataCell>
                        <CTableDataCell>{item.current_length}</CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.length}
                            onChange={(e) => handleChangeLength(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          {(item.attributes.price * item.length * 0.01).toLocaleString()}
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
                      <CTableHeaderCell colSpan="7"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products.reduce(
                            (sum, item) =>
                              sum + parseInt(item.length) * item.attributes.price * 0.01,
                            0,
                          )
                        })()}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thanh toán</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <h6 className="mb-3">Thông tin người mua</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-fill">
                    <InputDropdownSearch
                      placeholder="Tìm kiếm khách hàng"
                      ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/customer`}
                      ajaxDataPopulate={['name']}
                      ajaxDataGetFilters={(value) => {
                        return {
                          $or: [
                            {
                              name: {
                                firstname: { $containsi: value },
                                lastname: { $containsi: value },
                              },
                            },
                            { phone: { $containsi: value } },
                          ],
                        }
                      }}
                      ajaxDataGetItemName={(item) =>
                        `${item.phone} - ${item.name.firstname} ${item.name.lastname}`
                      }
                      handleNotFound={() => toast.error('Không tìm thấy khách hàng này !!!')}
                      handleFound={(item) => handleLoadCustomerData(item)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nhập họ"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <CFormFeedback invalid>Đây là trường bắt buộc</CFormFeedback>
                  </div>
                  <div className="p-2"></div>
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nhập tên"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <CFormFeedback invalid>Đây là trường bắt buộc</CFormFeedback>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nhập số điện thoại"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <CFormFeedback invalid>Đây là trường bắt buộc</CFormFeedback>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <h6>Tổng (đ)</h6>
                <CFormInput
                  placeholder="Tổng"
                  value={(() => {
                    return products
                      .reduce(
                        (sum, item) => sum + parseInt(item.length) * item.attributes.price * 0.01,
                        0,
                      )
                      .toLocaleString()
                  })()}
                  required
                  readOnly
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={12} className="mb-3">
                <h6>Khách hàng trả (đ)</h6>
                <CFormInput
                  type="number"
                  placeholder="Khách hàng trả"
                  value={paymentCost}
                  onChange={(e) => setPaymentCost(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Đây là trường bắt buộc</CFormFeedback>
              </CCol>
              <CCol md={12} className="mb-3">
                <h6>Tiền dư / nợ (đ)</h6>
                <CFormInput
                  placeholder="Tiền dư / nợ"
                  required
                  value={(() => {
                    return (-products.reduce(
                      (sum, item) => sum + parseInt(item.length) * item.attributes.price * 0.01,
                      -paymentCost,
                    )).toLocaleString()
                  })()}
                  readOnly
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu và xuất kho</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton
              href="/orders/sell"
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
