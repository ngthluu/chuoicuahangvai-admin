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
import { faEye, faSearch, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const [customersList, setCustomersList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = qs.stringify(
        { populate: ['name', 'address', 'address.address_three_levels'] },
        { encodeValuesOnly: true },
      )
      const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/customer?${query}`)
      console.log(response.data.data)
      setCustomersList(response.data.data)
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
                <h4 className="mb-3">Quản lý khách hàng</h4>
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
                  <CTableHeaderCell scope="col"> Họ và tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Địa chỉ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số điện thoại </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {customersList.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/customers/view?id=${item.id}`}>
                        {item.name.firstname} {item.name.lastname}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.address.address}
                      <span>, </span>
                      {item.address.address_three_levels.ward}
                      <span>, </span>
                      {item.address.address_three_levels.district}
                      <span>, </span>
                      {item.address.address_three_levels.city}
                    </CTableDataCell>
                    <CTableDataCell> {item.phone} </CTableDataCell>
                    <CTableDataCell>
                      <StatusLabel status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/customers/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
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
