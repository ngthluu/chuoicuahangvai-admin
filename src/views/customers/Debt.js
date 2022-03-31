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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CBadge,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faFilePdf, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const ordersList = [
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '1.000.000đ',
    status: 0,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '0đ',
    status: 1,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '1.000.000đ',
    status: 0,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '1.000.000đ',
    status: 0,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '0đ',
    status: 1,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '0đ',
    status: 1,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '1.000.000đ',
    status: 0,
  },
  {
    code: '#KH21091001',
    name: 'Nguyễn Văn A',
    debt: '1.000.000đ',
    status: 0,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Đang nợ</CBadge>
  }
  return <CBadge color="success">Thanh toán đủ</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const Home = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý khách hàng (công nợ)</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="MSKH, Họ và tên..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect options={['Chọn trạng thái']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
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
            <CTable align="middle" bordered>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Họ và tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số tiền nợ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/customers/view?id=${index}`}>{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.name} </CTableDataCell>
                    <CTableDataCell> {item.debt} </CTableDataCell>
                    <CTableDataCell>
                      <Status status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faEdit} /> Cập nhật số tiền nợ
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
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

export default Home
