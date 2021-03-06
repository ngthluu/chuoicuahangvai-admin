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
import ActionButtons from './ActionButtons'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [branch, setBranch] = useState('')
  const [branchName, setBranchName] = useState('')
  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')
  const [orderId, setOrderId] = useState('')
  const [orderCode, setOrderCode] = useState('')

  const handleDelete = (index) => {
    let newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
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

    let data = {
      branch: { id: branch },
      note: note,
      products: products.map((item) => {
        let data = {
          inventory_item: { id: item.id },
          unit_price: item.price,
          length: item.length,
        }
        if (item.componentId != null) {
          data.id = item.componentId
        }
        return data
      }),
    }
    if (orderId !== '') {
      data = { ...data, order: { id: orderId } }
    }

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports`, {
          data: data,
        })
        .then((response) => toast.success('Thao t??c th??nh c??ng'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao t??c th???t b???i. C?? l???i x???y ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao t??c th??nh c??ng'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao t??c th???t b???i. C?? l???i x???y ra: ${errorMessage}!!`)
        })
    }
  }

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'branch',
          'order',
          'products',
          'products.inventory_item',
          'products.inventory_item.sku_quantity',
          'products.inventory_item.sku_quantity.sku',
          'products.inventory_item.sku_quantity.sku.product',
          'products.inventory_item.sku_quantity.sku.pattern',
          'products.inventory_item.sku_quantity.sku.color',
          'products.inventory_item.sku_quantity.sku.stretch',
          'products.inventory_item.sku_quantity.sku.width',
          'products.inventory_item.sku_quantity.sku.origin',
          'products.inventory_item.sku_quantity.sku.images',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports/${id}?${query}`)
    const data = response.data.data
    setBranch(data.attributes.branch.data.id)
    setBranchName(data.attributes.branch.data.attributes.name)
    setProducts(
      data.attributes.products.map((item) => {
        const inventoryItem = item.inventory_item.data
        const skuItem = inventoryItem.attributes.sku_quantity.sku.data
        const productSku = skuItem.attributes.sku
        const productName = skuItem.attributes.product.data.attributes.name
        const productAttributes = skuItem.attributes
        const currentInventoryLength = inventoryItem.attributes.sku_quantity.length
        const productItem = {
          componentId: item.id,
          id: inventoryItem.id,
          sku: productSku,
          name: productName,
          attributes: productAttributes,
          length: item.length,
          current_length: currentInventoryLength,
        }
        return productItem
      }),
    )
    setNote(data.attributes.note)
    setOrderId(data.attributes.order.data ? data.attributes.order.data.id : '')
    setOrderCode(
      data.attributes.order.data
        ? `${data.attributes.order.data.attributes.type.toUpperCase()}#${
            data.attributes.order.data.id
          }`
        : '',
    )
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
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Th??ng tin</h5>
            <div className="d-flex justify-content-between align-items-center">
              <CButton color="info" type="submit" className="text-white">
                <FontAwesomeIcon icon={faSave} /> L??u th??ng tin
              </CButton>
              <div className="p-1"></div>
              {id !== null ? <ActionButtons id={id}></ActionButtons> : <></>}
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>????n h??ng</CFormLabel>
                <InputDropdownSearch
                  placeholder="T??m ki???m ????n h??ng"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/orders`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ id: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.attributes.type.toUpperCase()}#${item.id}`}
                  handleNotFound={() => toast.error('Kh??ng t??m th???y ????n h??ng n??y !!!')}
                  handleFound={(item) => setOrderId(item.id)}
                  setTextNameAfterFound={true}
                  defaultName={orderCode}
                />
              </CCol>
            </CRow>
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
                      <CTableHeaderCell scope="col"> M?? t??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i trong kho (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i xu???t (cm) </CTableHeaderCell>
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
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell>
                          <ProductDescription attributes={item.attributes}></ProductDescription>
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
                      <CTableHeaderCell colSpan="6"> T???ng gi?? tr??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products.reduce((sum, item) => sum + parseInt(item.length), 0)
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
                <CFormLabel>Ghi ch??</CFormLabel>
                <CFormTextarea
                  placeholder="Nh???p ghi ch??"
                  rows="5"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
