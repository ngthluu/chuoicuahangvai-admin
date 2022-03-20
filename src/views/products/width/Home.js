import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

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
import { faEye, faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const [widthList, setWidthList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = qs.stringify({}, { encodeValuesOnly: true })
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/product-widths?${query}`,
      )
      setWidthList(response.data.data)
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
                <h4 className="mb-3">Chiều rộng</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Tìm kiếm theo từ khóa..." />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              <Link to="/products/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Chiều rộng</strong>
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
                  <CTableHeaderCell scope="col"> Tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {widthList.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell> {item.attributes.name} </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/products/view?id=${index}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/products/edit?id=${index}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
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
