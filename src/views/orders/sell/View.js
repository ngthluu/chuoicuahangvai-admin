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
  CBadge,
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

import { Link } from 'react-router-dom'
import ProductDescription from 'src/views/products/ProductDescription'

const View = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [orderCode, setOrderCode] = useState('')
  const [createdTime, setCreatedTime] = useState('')
  const [branchName, setBranchName] = useState('')

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')
  const [statuses, setStatuses] = useState([])

  const [receiveAddressFirstName, setReceiveAddressFirstName] = useState('')
  const [receiveAddressLastName, setReceiveAddressLastName] = useState('')
  const [receiveAddressPhone, setReceiveAddressPhone] = useState('')
  const [receiveAddressAddress, setReceiveAddressAddress] = useState('')
  const [receiveAddressWard, setReceiveAddressWard] = useState('')
  const [receiveAddressDistrict, setReceiveAddressDistrict] = useState('')
  const [receiveAddressCity, setReceiveAddressCity] = useState('')

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'customer',
          'customer.name',
          'branch',
          'products',
          'products.inventory_item',
          'products.inventory_item.sku_quantity',
          'products.inventory_item.sku_quantity.sku',
          'products.inventory_item.sku_quantity.sku.product',
          'products.inventory_item.sku_quantity.sku.color',
          'products.inventory_item.sku_quantity.sku.pattern',
          'products.inventory_item.sku_quantity.sku.stretch',
          'products.inventory_item.sku_quantity.sku.width',
          'products.inventory_item.sku_quantity.sku.origin',
          'products.inventory_item.sku_quantity.sku.images',
          'order_statuses',
          'receive_address',
          'receive_address.name',
          'receive_address.address',
          'receive_address.address.address_three_levels',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/orders/${id}?${query}`)
    const data = response.data.data

    setOrderCode(`${data.attributes.type.toUpperCase()}#${data.id}`)
    setCreatedTime(data.attributes.createdAt)
    setBranchName(data.attributes.branch.data.attributes.name)

    setEmail(data.attributes.customer.data.attributes.email)
    setPhone(data.attributes.customer.data.attributes.phone)
    setFirstName(data.attributes.customer.data.attributes.name.firstname)
    setLastName(data.attributes.customer.data.attributes.name.lastname)

    if (data.attributes.receive_address) {
      setReceiveAddressFirstName(data.attributes.receive_address.name.firstname)
      setReceiveAddressLastName(data.attributes.receive_address.name.lastname)
      setReceiveAddressPhone(data.attributes.receive_address.phone)
      setReceiveAddressAddress(data.attributes.receive_address.address.address)
      setReceiveAddressWard(
        data.attributes.receive_address.address.address_three_levels.data.attributes.ward,
      )
      setReceiveAddressDistrict(
        data.attributes.receive_address.address.address_three_levels.data.attributes.district,
      )
      setReceiveAddressCity(
        data.attributes.receive_address.address.address_three_levels.data.attributes.city,
      )
    }

    setProducts(
      data.attributes.products.map((item) => {
        const inventoryItem = item.inventory_item.data
        const skuItem = inventoryItem.attributes.sku_quantity.sku.data
        const productSku = skuItem.attributes.sku
        const productName = skuItem.attributes.product.data.attributes.name
        const productAttributes = skuItem.attributes
        const productItem = {
          componentId: item.id,
          id: inventoryItem.id,
          sku: productSku,
          name: productName,
          attributes: productAttributes,
          length: item.length,
          price: skuItem.attributes.price,
        }
        return productItem
      }),
    )
    setNote(data.attributes.note)
    setStatuses(data.attributes.order_statuses.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin đơn hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin đơn hàng</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mã đơn hàng: </div>
                  <div>{orderCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mua tại cửa hàng: </div>
                  <div>{branchName}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Thời gian khởi tạo: </div>
                  <div>{createdTime}</div>
                </div>
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin người mua</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Email người mua: </div>
                  <div>{email}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Họ và tên: </div>
                  <div>
                    {receiveAddressFirstName !== ''
                      ? `${receiveAddressFirstName} ${receiveAddressLastName}`
                      : `${firstName} ${lastName}`}
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Số điện thoại: </div>
                  <div>{receiveAddressPhone !== '' ? receiveAddressPhone : phone}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Địa chỉ nhận hàng: </div>
                  <div>
                    {receiveAddressWard !== ''
                      ? `${receiveAddressAddress}, ${receiveAddressWard}, ${receiveAddressDistrict}, ${receiveAddressCity}`
                      : ''}
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Đơn giá (đ/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tổng cộng (đ) </CTableHeaderCell>
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
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell>
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell> {parseInt(item.price).toLocaleString()} </CTableDataCell>
                        <CTableDataCell> {item.length} </CTableDataCell>
                        <CTableDataCell>
                          {parseInt(item.price * item.length * 0.01).toLocaleString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="6"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce((sum, item) => sum + item.price * item.length * 0.01, 0)
                            .toLocaleString()
                        })()}
                      </CTableHeaderCell>
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Lịch sử cập nhật</CFormLabel>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Thời gian </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {statuses.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          {item.attributes.status === 'initialize' ? (
                            <CBadge color="warning">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : item.attributes.status === 'confirmed' ||
                            item.attributes.status === 'packaged' ||
                            item.attributes.status === 'delivery' ? (
                            <CBadge color="primary">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : item.attributes.status === 'return' ||
                            item.attributes.status === 'canceled' ? (
                            <CBadge color="danger">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : (
                            <CBadge color="success">{item.attributes.status.toUpperCase()}</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{item.attributes.createdAt}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
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

export default View
