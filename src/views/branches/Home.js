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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWarehouse,
  faEye,
  faEdit,
  faCheck,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const branchesList = [
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
  {
    name: 'Chi nhánh A',
    manager: 'Nguyễn Văn A',
    address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
  },
]

const Home = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <h4>Quản lý chi nhánh</h4>
              <div>
                <Link to="/branches/add">
                  <CButton color="info" className="text-white">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Chi nhánh</strong>
                  </CButton>
                </Link>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
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
                      <a href="/">{item.name}</a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <a href="/">{item.manager}</a>
                    </CTableDataCell>
                    <CTableDataCell> {item.address} </CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faWarehouse} /> Xem tồn kho
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faCheck} /> Kích hoạt
                          </CDropdownItem>
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
