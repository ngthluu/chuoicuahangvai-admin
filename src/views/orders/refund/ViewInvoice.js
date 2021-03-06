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
import ActionButtons from './ActionButtons'

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
  const [statuses, setStatuses] = useState([])

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'refund',
          'refund.refund_statuses',
          'customer_name',
          'receive_address',
          'receive_address.address_three_levels',
          'products',
          'products.sku',
          'products.sku.product',
          'products.sku.color',
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
    setStatuses(data.attributes.refund.data.attributes.refund_statuses.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Th??ng tin h??a ????n</h5>
            <div>
              <ActionButtons
                id={orderId}
                status={
                  statuses.length > 0
                    ? statuses[statuses.length - 1].attributes.update_status
                    : false
                }
                invoice_id={id}
                fetchData={fetchData}
              ></ActionButtons>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin h??a ????n</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>M?? h??a ????n: </div>
                  <div>{invoiceCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>M?? ????n tr???: </div>
                  <Link to={`/orders/refund/view?id=${orderId}`}>{orderCode}</Link>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Th???i gian kh???i t???o: </div>
                  <div>{createdTime}</div>
                </div>
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin ng?????i mua</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>H??? v?? t??n: </div>
                  <div>{`${firstName} ${lastName}`}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>S??? ??i???n tho???i: </div>
                  <div>{phone}</div>
                </div>
                {ward !== '' ? (
                  <div className="d-flex justify-content-between mb-3">
                    <div>?????a ch??? nh???n h??ng: </div>
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
                      <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Gi?? (??/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T???ng (??) </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/products/view?id=${item.id}`}>{item.sku}</Link>
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
                      <CTableHeaderCell colSpan="5"> T???ng gi?? tr??? </CTableHeaderCell>
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
                      <CTableHeaderCell colSpan="5"> Gi?? tr??? h??a ????n </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {invoiceTotal.toLocaleString()}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default ViewInvoice
