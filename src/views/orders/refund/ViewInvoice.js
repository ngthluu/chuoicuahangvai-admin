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

  const [invoiceTotal, setInvoiceTotal] = useState('')

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'refund',
          'customer_name',
          'receive_address',
          'receive_address.address_three_levels',
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
      ${process.env.REACT_APP_STRAPI_URL}/api/refund-invoices/${id}?${query}`)
    const data = response.data.data

    setInvoiceCode(`R-INVOICE#${data.id}`)
    setInvoiceTotal(data.attributes.price)
    setOrderId(data.attributes.refund.data.id)
    setOrderCode(`REFUND#${data.attributes.refund.data.id}`)
    setCreatedTime(data.attributes.createdAt)

    setFirstName(data.attributes.customer_name.firstname)
    setLastName(data.attributes.customer_name.lastname)
    setPhone(data.attributes.customer_phone)
    if (data.attributes.receive_address) {
      setAddress(data.attributes.receive_address.address)
      setWard(data.attributes.receive_address.address_three_levels.data.attributes.ward)
      setDistrict(data.attributes.receive_address.address_three_levels.data.attributes.district)
      setCity(data.attributes.receive_address.address_three_levels.data.attributes.city)
    }

    setProducts(
      data.attributes.products.map((item) => {
        return {
          componentId: item.id,
          id: item.sku.data.id,
          sku: item.sku.data.attributes.sku,
          name: item.sku.data.attributes.product.data.attributes.name,
          attributes: item.sku.data.attributes,
          quantity: item.quantity,
          length: item.length,
        }
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
            <h5>Thông tin đơn trả</h5>
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
                  <div>Mã đơn trả: </div>
                  <Link to={`/orders/refund/view?id=${orderId}`}>{orderCode}</Link>
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
                <CTable align="middle" bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Giá (đ/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tổng (đ) </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          <Link to="#">{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.name}
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell>
                          {parseInt(item.attributes.price).toLocaleString()}
                        </CTableDataCell>
                        <CTableDataCell>{item.length}</CTableDataCell>
                        <CTableDataCell>
                          {(item.attributes.price * item.length * 0.01).toLocaleString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce(
                              (sum, item) =>
                                sum + parseInt(item.length) * item.attributes.price * 0.01,
                              0,
                            )
                            .toLocaleString()
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> Giá trị hóa đơn </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {invoiceTotal.toLocaleString()}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton
              href="/orders/refund"
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
