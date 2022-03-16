import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import StatusLabel from 'src/views/template/StatusLabel'
import StatusAction from 'src/views/template/StatusAction'

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
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = qs.stringify({ populate: ['role', 'branches'] }, { encodeValuesOnly: true })
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users?${query}`)
      setUsersList(response.data.data)
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
                <h4 className="mb-3">Quản lý nhân viên</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Họ và tên..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Cửa hàng</CFormLabel>
                      <CFormSelect options={['Chọn cửa hàng']}></CFormSelect>
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
                  <CTableHeaderCell scope="col"> Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên nhân viên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chức vụ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {usersList.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/users/view?id=${item.id}`}>{item.email}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.username} </CTableDataCell>
                    <CTableDataCell> {item.role.name} </CTableDataCell>
                    <CTableDataCell>{item.branches.map((el) => el.name).join(', ')}</CTableDataCell>
                    <CTableDataCell>
                      <StatusLabel status={item.blocked} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/users/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/users/edit?id=${item.id}`}>
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
