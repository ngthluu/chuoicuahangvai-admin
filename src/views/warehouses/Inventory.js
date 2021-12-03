import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormLabel,
  CImage,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import sampleImage from 'src/assets/images/vue.jpg'

const importsList = [
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    quantity: 200,
    latest_update_time: '25/09/2021',
  },
]

const Inventory = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý tồn kho</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Kho</CFormLabel>
                      <CFormSelect options={['Chọn kho']}></CFormSelect>
                    </div>
                  </div>
                </CForm>
              </div>
              <Link to="#">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faFilePdf} /> <strong>Xuất PDF</strong>
                </CButton>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" responsive bordered>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hình ảnh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Mã sản phẩm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên sản phẩm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số lượng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian cập nhật gần nhất </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {importsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <CImage width="200" src={item.image}></CImage>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.name} </CTableDataCell>
                    <CTableDataCell> {item.quantity} </CTableDataCell>
                    <CTableDataCell> {item.latest_update_time} </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Inventory
