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

const ViewInvoice = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [invoiceCode, setInvoiceCode] = useState('')
  const [orderId, setOrderId] = useState('')
  const [orderCode, setOrderCode] = useState('')
  const [createdTime, setCreatedTime] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [ward, setWard] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')

  const [products, setProducts] = useState([])
  const [deliveryMethodAmount, setDeliveryMethodAmount] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')

  const [invoiceTotal, setInvoiceTotal] = useState('')
  const [paymentHistory, setPaymentHistory] = useState([])

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'order',
          'customer_name',
          'receive_address',
          'receive_address.name',
          'receive_address.address',
          'receive_address.address.address_three_levels',
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
          'order_payment_invoices',
          'delivery_method',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/order-invoices/${id}?${query}`)
    const data = response.data.data

    setInvoiceCode(`S-INVOICE#${data.id}`)
    setInvoiceTotal(data.attributes.price)
    setOrderId(data.attributes.order.data.id)
    setOrderCode(
      `${data.attributes.order.data.attributes.type.toUpperCase()}#${
        data.attributes.order.data.id
      }`,
    )
    setCreatedTime(data.attributes.createdAt)
    setPaymentHistory(data.attributes.order_payment_invoices.data)

    setFirstName(
      data.attributes.receive_address
        ? data.attributes.receive_address.name.firstname
        : data.attributes.customer_name.firstname,
    )
    setLastName(
      data.attributes.receive_address
        ? data.attributes.receive_address.name.lastname
        : data.attributes.customer_name.lastname,
    )
    setPhone(
      data.attributes.receive_address
        ? data.attributes.receive_address.phone
        : data.attributes.customer_phone,
    )
    if (data.attributes.receive_address) {
      setAddress(data.attributes.receive_address.address.address)
      setWard(data.attributes.receive_address.address.address_three_levels.data.attributes.ward)
      setDistrict(
        data.attributes.receive_address.address.address_three_levels.data.attributes.district,
      )
      setCity(data.attributes.receive_address.address.address_three_levels.data.attributes.city)
    }

    if (data.attributes.delivery_method) {
      setDeliveryMethodAmount(data.attributes.delivery_method.amount)
      setDeliveryMethod(data.attributes.delivery_method.method)
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
                <h6 className="mb-3">Thông tin hóa đơn</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mã hóa đơn: </div>
                  <div>{invoiceCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mã đơn hàng: </div>
                  <Link to={`/orders/sell/view?id=${orderId}`}>{orderCode}</Link>
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
                  <div>Họ và tên: </div>
                  <div>{`${firstName} ${lastName}`}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Số điện thoại: </div>
                  <div>{phone}</div>
                </div>
                {ward !== '' ? (
                  <div className="d-flex justify-content-between mb-3">
                    <div>Địa chỉ nhận hàng: </div>
                    <div>{`${address}, ${ward}, ${district}, ${city}`}</div>
                  </div>
                ) : (
                  <></>
                )}
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
                      <CTableHeaderCell scope="col"> Đơn giá (đ/m)</CTableHeaderCell>
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
                      <CTableHeaderCell colSpan="7"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce((sum, item) => sum + item.price * item.length * 0.01, 0)
                            .toLocaleString()
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                    {deliveryMethod ? (
                      <>
                        <CTableRow>
                          <CTableHeaderCell colSpan="7"> Phí vận chuyển </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {parseInt(deliveryMethodAmount).toLocaleString()}
                          </CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell colSpan="7"> Tổng giá trị </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {(() => {
                              return products
                                .reduce(
                                  (sum, item) => sum + item.price * item.length * 0.01,
                                  parseInt(deliveryMethodAmount),
                                )
                                .toLocaleString()
                            })()}
                          </CTableHeaderCell>
                        </CTableRow>
                      </>
                    ) : (
                      <></>
                    )}
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Lịch sử thanh toán</CFormLabel>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Thời gian </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Số tiền (đ)</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {paymentHistory.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>{item.attributes.createdAt}</CTableDataCell>
                        <CTableDataCell>
                          {parseInt(item.attributes.amount).toLocaleString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan={2}> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return paymentHistory
                            .reduce((sum, item) => sum + parseInt(item.attributes.amount), 0)
                            .toLocaleString()
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan={2}> Tổng giá trị hóa đơn</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {invoiceTotal.toLocaleString()}
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan={2}> Còn nợ</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return (
                            invoiceTotal -
                            paymentHistory.reduce(
                              (sum, item) => sum + parseInt(item.attributes.amount),
                              0,
                            )
                          ).toLocaleString()
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
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

export default ViewInvoice
