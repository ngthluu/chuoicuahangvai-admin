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
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const ordersList = [
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 1,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 0,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 1,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 1,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 0,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 1,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 0,
  },
  {
    code: '#USR000101',
    name: 'Nguyễn Văn A',
    role_name: 'Quản lý chi nhánh',
    branch_name: 'Chi nhánh Q.10',
    status: 0,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Bị khóa</CBadge>
  }
  return <CBadge color="success">Đang hoạt động</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const StatusAction = (props) => {
  if (props.status === 0) {
    return (
      <CDropdownItem href="#">
        <FontAwesomeIcon icon={faUnlock} /> Mở khóa
      </CDropdownItem>
    )
  }
  return (
    <CDropdownItem href="#">
      <FontAwesomeIcon icon={faLock} /> Khóa
    </CDropdownItem>
  )
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
                <h4 className="mb-3">Quản lý nhân viên</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Họ và tên..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Chi nhánh</CFormLabel>
                      <CFormSelect options={['Chọn chi nhánh']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Chức vụ</CFormLabel>
                      <CFormSelect options={['Chọn chức vụ']}></CFormSelect>
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
              <Link to="/users/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Nhân viên</strong>
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
                  <CTableHeaderCell scope="col"> Mã số </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên nhân viên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chức vụ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chi nhánh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/users/view?id=${index}`}>{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.name} </CTableDataCell>
                    <CTableDataCell> {item.role_name} </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.branch_name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Status status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/users/view?id=${index}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/users/edit?id=${index}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <StatusAction status={item.status} />
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faTrash} /> Xóa
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
