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
      price: skuItem.attributes.price,
      length: 0,
      current_length: currentInventoryLength,
    })
    setProducts(newProducts)
  }

  const handleChangePrice = (index, value) => {
    let newProducts = [...products]
    newProducts[index].price = parseInt(value)
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
      toast.error(`Thao t??c th???t b???i. Kh??ng th??? xu???t qu?? SL t???n kho !!`)
      return
    }

    const data = {
      branch: { id: branch },
      products: products.map((item) => {
        let data = {
          inventory_item: { id: item.id },
          length: item.length,
          unit_price: item.price,
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
      .then((response) => toast.success('Thao t??c th??nh c??ng'))
      .catch((error) => {
        const errorMessage = error.response.data.error.message
        toast.error(`Thao t??c th???t b???i. C?? l???i x???y ra: ${errorMessage}!!`)
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
            <h5>????n h??ng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>C???a h??ng</CFormLabel>
                <InputDropdownSearch
                  placeholder="T??m ki???m c???a h??ng"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ name: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.attributes.name}`}
                  handleNotFound={() => toast.error('Kh??ng t??m th???y c???a h??ng n??y !!!')}
                  handleFound={(item) => setBranch(item.id)}
                  setTextNameAfterFound={true}
                  defaultName={branchName}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <InputDropdownSearch
                placeholder="T??m ki???m c??y v???i trong c???a h??ng"
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
                  `#${item.id} - (${item.attributes.sku_quantity.sku.data.attributes.sku} - ${item.attributes.sku_quantity.sku.data.attributes.product.data.attributes.name}) - C??n ${item.attributes.sku_quantity.length} cm`
                }
                handleNotFound={() => toast.error('Kh??ng t??m th???y c??y v???i n??y !!!')}
                handleFound={(item) => handleAddInventoryItem(item)}
              />
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Gi?? (??/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i trong kho (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i xu???t (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T???ng (??) </CTableHeaderCell>
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
                          <Link to={`/products/view?id=${item.id}`}>{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.name}
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.price}
                            onChange={(e) => handleChangePrice(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>{item.current_length}</CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.length}
                            onChange={(e) => handleChangeLength(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          {(item.price * item.length * 0.01).toLocaleString()}
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
                      <CTableHeaderCell colSpan="7"> T???ng gi?? tr??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce(
                              (sum, item) => sum + parseInt(item.length) * item.price * 0.01,
                              0,
                            )
                            .toLocaleString()
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
            <h5>Thanh to??n</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12} className="mb-3">
                <h6 className="mb-3">Th??ng tin ng?????i mua</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-fill mb-3">
                    <InputDropdownSearch
                      placeholder="T??m ki???m kh??ch h??ng"
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
                      handleNotFound={() => toast.error('Kh??ng t??m th???y kh??ch h??ng n??y !!!')}
                      handleFound={(item) => handleLoadCustomerData(item)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nh???p h???"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <CFormFeedback invalid>????y l?? tr?????ng b???t bu???c</CFormFeedback>
                  </div>
                  <div className="p-2"></div>
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nh???p t??n"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <CFormFeedback invalid>????y l?? tr?????ng b???t bu???c</CFormFeedback>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="flex-fill">
                    <CFormInput
                      type="text"
                      placeholder="Nh???p s??? ??i???n tho???i"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <CFormFeedback invalid>????y l?? tr?????ng b???t bu???c</CFormFeedback>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <h6>T???ng (??)</h6>
                <CFormInput
                  placeholder="T???ng"
                  value={(() => {
                    return products
                      .reduce((sum, item) => sum + parseInt(item.length) * item.price * 0.01, 0)
                      .toLocaleString()
                  })()}
                  required
                  readOnly
                />
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
              <CCol md={12} className="mb-3">
                <h6>Kh??ch h??ng tr??? (??)</h6>
                <CFormInput
                  type="number"
                  placeholder="Kh??ch h??ng tr???"
                  value={paymentCost}
                  onChange={(e) => setPaymentCost(e.target.value)}
                  required
                />
                <CFormFeedback invalid>????y l?? tr?????ng b???t bu???c</CFormFeedback>
              </CCol>
              <CCol md={12} className="mb-3">
                <h6>Ti???n d?? / n??? (??)</h6>
                <CFormInput
                  placeholder="Ti???n d?? / n???"
                  required
                  value={(() => {
                    return (-products.reduce(
                      (sum, item) => sum + parseInt(item.length) * item.price * 0.01,
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
              <FontAwesomeIcon icon={faSave} /> <strong>L??u v?? xu???t kho</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton
              href="/orders/sell"
              color="secondary"
              type="button"
              className="text-white ml-3"
            >
              <strong>H???y b???</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
