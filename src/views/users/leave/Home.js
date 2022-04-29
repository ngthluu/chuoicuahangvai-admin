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
import {
  faEye,
  faEdit,
  faSearch,
  faPlus,
  faTrash,
  faUnlock,
  faLock,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const ordersList = [
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 1,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 0,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 0,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 1,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 0,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 1,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 1,
  },
  {
    name: 'Nguyễn Văn A',
    branch_name: 'Cửa hàng Q.10',
    salary: '10.000.000đ',
    time: 'Tháng 11, 2011',
    status: 1,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Chưa thanh toán</CBadge>
  }
  return <CBadge color="success">Đã thanh toán</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const StatusAction = (props) => {
  if (props.status === 0) {
    return (
      <CDropdownItem href="#">
        <FontAwesomeIcon icon={faDollarSign} /> Thanh toán
      </CDropdownItem>
    )
  }
  return <></>
}
StatusAction.propTypes = { status: PropTypes.number }

const Home = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Bảng lương</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Cửa hàng</CFormLabel>
                      <CFormSelect options={['Chọn cửa hàng']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect options={['Chọn trạng thái']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Từ</CFormLabel>
                      <CFormInput type="date" placeholder="Từ" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Đến</CFormLabel>
                      <CFormInput type="date" placeholder="Đến" />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" bordered responsive>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số tiền </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/users/view?id=${index}`}>{item.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.branch_name}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.salary} </CTableDataCell>
                    <CTableDataCell> {item.time} </CTableDataCell>
                    <CTableDataCell>
                      <Status status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <StatusAction status={item.status} />
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
