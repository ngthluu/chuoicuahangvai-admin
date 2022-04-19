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
          'products.sku.pattern',
          'products.sku.stretch',
          'products.sku.width',
          'products.sku.origin',
          'products.sku.images',
          'refund_statuses',
          'refund_statuses.update_user',
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
          <CCardHeader>
            <h5>Thông tin đơn trả hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin đơn trả hàng</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mã đơn trả: </div>
                  <div>{orderCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Trả tại chi nhánh: </div>
                  <div>{branchName}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Thời gian khởi tạo: </div>
                  <div>{createdTime}</div>
                </div>
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin người trả</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Email người trả: </div>
                  <div>{email}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Họ và tên: </div>
                  <div>{`${firstName} ${lastName}`}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Số điện thoại: </div>
                  <div>{phone}</div>
                </div>
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
                <CTable align="middle" bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Thời gian </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Người cập nhật </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {statuses.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          {!item.attributes.update_status ? (
                            <CBadge color="warning">Chưa xác nhận</CBadge>
                          ) : (
                            <CBadge color="success">Đã xác nhận và nhập kho</CBadge>
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
