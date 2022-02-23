import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWarehouse,
  faEye,
  faEdit,
  faCheck,
  faTrash,
  faPlus,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Tạm khóa</CBadge>
  }
  return <CBadge color="success">Đang hoạt động</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const StatusAction = (props) => {
  if (props.status === 0) {
    return (
      <>
        <FontAwesomeIcon icon={faCheck} /> Kích hoạt
      </>
    )
  }
  return (
    <>
      <FontAwesomeIcon icon={faLock} /> Khóa
    </>
  )
}
StatusAction.propTypes = { status: PropTypes.number }

const Home = () => {
  const [branchesList, setBranchesList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios('http://localhost:1337/api/branches')
      setBranchesList(result.data)
    }
    fetchData()
  }, [])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý cửa hàng</h4>
              </div>
              <Link to="/branches/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Cửa hàng</strong>
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
                  <CTableHeaderCell scope="col"> Tên cửa hàng </CTableHeaderCell>
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
                      <Link to={`/branches/view?id=${index}`}>{item.name}</Link>
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
                          <CDropdownItem href={`/branches/view?id=${index}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/branches/edit?id=${index}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faWarehouse} /> Xem tồn kho
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <StatusAction status={item.status} />
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
