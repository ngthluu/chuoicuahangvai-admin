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
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faFilePdf,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import StatusLabel from 'src/views/template/StatusLabel'
import StatusAction from 'src/views/template/StatusAction'

const Home = () => {
  const [importsList, setImportsList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports`, {
        params: {
          populate: ['branch', 'submit_user'],
        },
      })
      setImportsList(result.data.data)
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
                <h4 className="mb-3">Quản lý phiếu nhập kho</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Kho</CFormLabel>
                      <CFormSelect options={['Chọn kho']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày nhập kho (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày nhập kho (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày nhập kho (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày nhập kho (đến)" />
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
              <Link to="/warehouses/import/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Phiếu nhập kho</strong>
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
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày nhập </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên nhập </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {importsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/warehouses/import/view?id=${item.id}`}>
                        {item.attributes.code}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.attributes.branch.data.attributes.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.attributes.submit_time} </CTableDataCell>
                    <CTableDataCell>
                      {item.attributes.submit_user.data
                        ? item.attributes.submit_user.data.attributes.username
                        : ''}
                    </CTableDataCell>
                    <CTableDataCell>
                      <StatusLabel status={item.attributes.submit_status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/warehouses/import/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/warehouses/import/edit?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <StatusAction status={item.status} />
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faFilePdf} /> Xuất PDF
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
