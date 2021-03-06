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
  const [orderInvoice, setOrderInvoce] = useState('')

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'customer',
          'customer.name',
          'branch',
          'products',
          'products.sku',
          'products.sku.product',
          'products.sku.color',
          'products.sku.pattern',
          'products.sku.stretch',
          'products.sku.width',
          'products.sku.origin',
          'products.sku.images',
          'refund_statuses',
          'refund_statuses.update_user',
          'refund_invoice',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/refunds/${id}?${query}`)
    const data = response.data.data

    setOrderCode(`REFUND#${data.id}`)
    setCreatedTime(data.attributes.createdAt)
    setBranchName(data.attributes.branch.data.attributes.name)

    setEmail(data.attributes.customer.data.attributes.email)
    setPhone(data.attributes.customer.data.attributes.phone)
    setFirstName(data.attributes.customer.data.attributes.name.firstname)
    setLastName(data.attributes.customer.data.attributes.name.lastname)

    if (data.attributes.refund_invoice.data) {
      setOrderInvoce(data.attributes.refund_invoice.data.id)
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
    setNote(data.attributes.note)
    setStatuses(data.attributes.refund_statuses.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Th??ng tin ????n h??ng</h5>
            <div>
              <ActionButtons
                id={id}
                status={
                  statuses.length > 0
                    ? statuses[statuses.length - 1].attributes.update_status
                    : false
                }
                invoice_id={orderInvoice}
                fetchData={fetchData}
              ></ActionButtons>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin ????n tr??? h??ng</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>M?? ????n tr???: </div>
                  <div>{orderCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Tr??? t???i c???a h??ng: </div>
                  <div>{branchName}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Th???i gian kh???i t???o: </div>
                  <div>{createdTime}</div>
                </div>
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin ng?????i tr???</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Email ng?????i tr???: </div>
                  <div>{email}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>H??? v?? t??n: </div>
                  <div>{`${firstName} ${lastName}`}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>S??? ??i???n tho???i: </div>
                  <div>{phone}</div>
                </div>
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>L???ch s??? c???p nh???t</CFormLabel>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Th???i gian </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Ng?????i c???p nh???t </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {statuses.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          {!item.attributes.update_status ? (
                            <CBadge color="warning">Ch??a x??c nh???n</CBadge>
                          ) : (
                            <CBadge color="success">???? x??c nh???n v?? nh???p kho</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.attributes.update_user.data.attributes.email}
                        </CTableDataCell>
                        <CTableDataCell>{item.attributes.update_time}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default View
