import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CCardHeader,
  CFormLabel,
  CFormInput,
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

const Add = () => {
  const [productsList, setProductsList] = useState([
    {
      code: '#PRO001',
      name: 'Sản phẩm A',
      import_price: 12000,
      length: 123,
      total_price: 12000 * 123,
    },
    {
      code: '#PRO002',
      name: 'Sản phẩm B',
      import_price: 11000,
      length: 12,
      total_price: 11000 * 12,
    },
    {
      code: '#PRO003',
      name: 'Sản phẩm C',
      import_price: 11000,
      length: 12,
      total_price: 11000 * 12,
    },
    {
      code: '#PRO004',
      name: 'Sản phẩm D',
      import_price: 1000,
      length: 12,
      total_price: 1000 * 12,
    },
    {
      code: '#PRO005',
      name: 'Sản phẩm E',
      import_price: 11000,
      length: 12,
      total_price: 11000 * 12,
    },
  ])

  const calculateTotalPrice = () => {
    let totalPrice = 0
    productsList.forEach((item) => {
      totalPrice += item.total_price
    })
    return totalPrice
  }

  return (
    <CCol md={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <h5>Thêm phiếu nhập kho</h5>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Mã số</CFormLabel>
              <CFormInput type="text" readOnly />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Kho</CFormLabel>
              <CFormInput type="text" readOnly />
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CTable align="middle" responsive bordered>
                <CTableHead align="middle" color="info">
                  <CTableRow>
                    <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Giá nhập / đv </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Chiều dài </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Tổng giá trị </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody align="middle">
                  {productsList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to="#">{item.code}</Link>
                      </CTableDataCell>
                      <CTableDataCell>{item.name} </CTableDataCell>
                      <CTableDataCell> {item.import_price} </CTableDataCell>
                      <CTableDataCell> {item.length} </CTableDataCell>
                      <CTableDataCell> {item.total_price} </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableFoot align="middle">
                  <CTableRow>
                    <CTableHeaderCell colSpan="5"> Tổng giá trị </CTableHeaderCell>
                    <CTableHeaderCell scope="col"> {calculateTotalPrice()} </CTableHeaderCell>
                  </CTableRow>
                </CTableFoot>
              </CTable>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Ghi chú</CFormLabel>
              <CFormTextarea readOnly rows="5"></CFormTextarea>
              <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter className="d-flex">
          <CButton href="/branches" color="secondary" type="button" className="text-white ml-3">
            <strong>Hủy bỏ</strong>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  )
}

export default Add
