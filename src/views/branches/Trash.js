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
  CBadge,
} from '@coreui/react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'

const branchesList = [
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 1,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 0,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 1,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 1,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 1,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 0,
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
    status: 1,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Tạm khóa</CBadge>
  }
  return <CBadge color="success">Đang hoạt động</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const Trash = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <h4>Quản lý chi nhánh (thùng rác)</h4>
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
                  <CTableHeaderCell scope="col"> Tên chi nhánh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Quản lý </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Địa chỉ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {branchesList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.manager}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.address} </CTableDataCell>
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
                            <FontAwesomeIcon icon={faUndo} /> Khôi phục
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faTrash} /> Xóa vĩnh viễn
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

export default Trash
