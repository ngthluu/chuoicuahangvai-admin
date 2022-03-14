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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse, faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const [branchesList, setBranchesList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = qs.stringify(
        { populate: ['address', 'address.address_three_levels', 'manager'] },
        { encodeValuesOnly: true },
      )
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/branches?${query}`)
      setBranchesList(response.data.data)
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
            <CTable align="middle" bordered>
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
                  <CTableRow key={item.id}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/branches/view?id=${item.id}`}>{item.attributes.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.attributes.manager.data != null && (
                        <Link to={`/users/view?id=${item.attributes.manager.data.id}`}>
                          {item.attributes.manager.data.attributes.email}
                        </Link>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.attributes.address.address}
                      <span>, </span>
                      {item.attributes.address.address_three_levels.data.attributes.ward}
                      <span>, </span>
                      {item.attributes.address.address_three_levels.data.attributes.district}
                      <span>, </span>
                      {item.attributes.address.address_three_levels.data.attributes.city}
                    </CTableDataCell>
                    <CTableDataCell>
                      <StatusLabel status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/branches/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/branches/edit?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <CDropdownItem href={`/warehouses/inventory?warehouse=${item.id}`}>
                            <FontAwesomeIcon icon={faWarehouse} /> Xem tồn kho
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
