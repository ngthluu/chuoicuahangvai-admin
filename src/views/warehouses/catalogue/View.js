import React, { useState } from 'react'
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

import { Link } from 'react-router-dom'

const View = () => {
  const [productsList, setProductsList] = useState([
    {
      code: '#PRO001',
      name: 'Sản phẩm A',
      length: 123,
    },
    {
      code: '#PRO002',
      name: 'Sản phẩm B',
      length: 12,
    },
    {
      code: '#PRO003',
      name: 'Sản phẩm C',
      length: 12,
    },
    {
      code: '#PRO004',
      name: 'Sản phẩm D',
      length: 12,
    },
    {
      code: '#PRO005',
      name: 'Sản phẩm E',
      length: 12,
    },
  ])

  const calculateTotalLength = () => {
    let totalLength = 0
    productsList.forEach((item) => {
      totalLength += item.length
    })
    return totalLength
  }

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thêm phiếu xuất kho</h5>
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
                      <CTableHeaderCell scope="col"> Chiều dài </CTableHeaderCell>
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
                        <CTableDataCell> {item.length} </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="3"> Tổng chiều dài </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> {calculateTotalLength()} </CTableHeaderCell>
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
            <CButton href="/  " color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default View
