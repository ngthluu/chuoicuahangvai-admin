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
  CBadge,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faSearch,
  faTrash,
  faFilePdf,
  faLock,
  faUnlock,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [customersList, setCustomersList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [
        { email: { $containsi: filterKeySearch } },
        {
          name: {
            firstname: { $containsi: filterKeySearch },
          },
        },
        {
          name: {
            lastname: { $containsi: filterKeySearch },
          },
        },
        { phone: { $containsi: filterKeySearch } },
      ],
      blocked: { $eq: filterStatus !== '1' },
    }
    if (filterKeySearch === '') delete filters.$or
    if (filterStatus === '') delete filters.blocked
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const query = qs.stringify(
      {
        sort: ['createdAt:desc'],
        filters: buildFilters(),
        populate: ['name', 'address', 'address.address_three_levels'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/customer?${query}`)
    setCustomersList(response.data.data)
    setTotalItems(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterStatus])

  const [deleteModalTargetId, setDeleteModalTargetId] = useState('')
  const [deleteModalTargetName, setDeleteModalTargetName] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const handleClickDelete = (e) => {
    e.preventDefault()
    setDeleteModalTargetId(e.currentTarget.getAttribute('data-id'))
    setDeleteModalTargetName(e.currentTarget.getAttribute('data-name'))
    setDeleteModalVisible(!deleteModalVisible)
  }

  // Submit logic
  const [submitModalTargetId, setSubmitModalTargetId] = useState('')
  const [submitModalTargetName, setSubmitModalTargetName] = useState('')
  const [submitModalVisible, setSubmitModalVisible] = useState(false)
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setSubmitModalTargetId(e.currentTarget.getAttribute('data-id'))
    setSubmitModalTargetName(e.currentTarget.getAttribute('data-name'))
    setSubmitModalVisible(!submitModalVisible)
  }

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/customer-export?${query}`,
      { responseType: 'blob' },
    )
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'report.xlsx')
    link.click()
  }

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa khách hàng"
        content={`Bạn có muốn xóa khách hàng ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/customer`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Cập nhật trạng thái khách hàng"
        content={`Bạn có muốn cập nhật trạng thái khách hàng ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/customer/submit`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý khách hàng</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="MSKH, Họ và tên..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Vãng lai</option>
                        <option value="1">Đã đăng ký</option>
                      </CFormSelect>
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
                <CButton color="info" className="text-white w-100" onClick={handleExportExcel}>
                  <FontAwesomeIcon icon={faFileExcel} /> <strong>Xuất Excel</strong>
                </CButton>
              </Link>
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
                  <CTableHeaderCell scope="col"> Họ và tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số điện thoại </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Địa chỉ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {customersList.length > 0 ? (
                  customersList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/customers/view?id=${item.id}`}>
                          {item.name.firstname} {item.name.lastname}
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell> {item.email} </CTableDataCell>
                      <CTableDataCell> {item.phone} </CTableDataCell>
                      <CTableDataCell>
                        {!item.address ? (
                          ''
                        ) : (
                          <>
                            {item.address.address}
                            <span>, </span>
                            {item.address.address_three_levels.ward}
                            <span>, </span>
                            {item.address.address_three_levels.district}
                            <span>, </span>
                            {item.address.address_three_levels.city}
                          </>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {!item.blocked ? (
                          <CBadge color="success">Đã đăng ký</CBadge>
                        ) : (
                          <CBadge color="warning">Vãng lai</CBadge>
                        )}
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
                            <CDropdownItem
                              href="#"
                              onClick={handleClickSubmit}
                              data-id={item.id}
                              data-name={`${item.name.firstname} ${item.name.lastname}`}
                            >
                              {!item.blocked ? (
                                <>
                                  <FontAwesomeIcon icon={faLock} /> Chuyển sang khách vãng lai
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faUnlock} /> Chuyển sang khách đăng ký
                                </>
                              )}
                            </CDropdownItem>
                            <CDropdownItem
                              href="#"
                              onClick={handleClickDelete}
                              data-id={item.id}
                              data-name={`${item.name.firstname} ${item.name.lastname}`}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Xóa
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={'100%'}>Chưa có dữ liệu</CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            <nav className="float-end">
              <SmartPagination
                activePage={page}
                pageSize={25}
                totalItems={totalItems}
                setPage={setPage}
              />
            </nav>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
