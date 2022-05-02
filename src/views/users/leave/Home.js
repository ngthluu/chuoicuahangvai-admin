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
  CBadge,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faSearch,
  faPlus,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [leaves, setLeaves] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      user: {
        email: { $containsi: filterKeySearch },
      },
      createdAt: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      approved: filterStatus === '1',
    }
    if (filterKeySearch === '') delete filters.user
    if (filterFrom === '' && filterTo === '') {
      delete filters.createdAt
    } else {
      if (filterFrom === '') delete filters.createdAt.$gte
      if (filterTo === '') delete filters.createdAt.$lte
    }
    if (filterStatus === '') delete filters.approved
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
        populate: ['user', 'approved_user'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves?${query}`)
    setLeaves(response.data.data)
    setTotalItems(response.data.meta.pagination.total)
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
  const handleDeleteSuccess = () => {
    fetchData()
    toast.success('Bạn đã xóa phiếu nghỉ phép thành công')
  }
  const handleDeleteError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  const [approvedModalTargetId, setApprovedModalTargetId] = useState('')
  const [approvedModalTargetName, setApprovedModalTargetName] = useState('')
  const [approvedModalVisible, setApprovedModalVisible] = useState(false)
  const handleClickApproved = (e) => {
    e.preventDefault()
    setApprovedModalTargetId(e.currentTarget.getAttribute('data-id'))
    setApprovedModalTargetName(e.currentTarget.getAttribute('data-name'))
    setApprovedModalVisible(!approvedModalVisible)
  }
  const handleApprovedSuccess = () => {
    fetchData()
    toast.success('Bạn đã duyệt phiếu nghỉ phép thành công')
  }
  const handleApprovedError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  return (
    <CRow>
      <ToastContainer />
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa phiếu nghỉ phép"
        content={`Bạn có muốn xóa phiếu nghỉ phép này không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves`}
        triggerSuccess={handleDeleteSuccess}
        triggerError={handleDeleteError}
        action="delete"
      ></Modal>
      <Modal
        visible={approvedModalVisible}
        visibleAction={setApprovedModalVisible}
        title="Duyệt phiếu nghỉ phép"
        content={`Bạn có muốn duyệt phiếu nghỉ phép này không ?`}
        id={approvedModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves-approve`}
        triggerSuccess={handleApprovedSuccess}
        triggerError={handleApprovedError}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Phiếu nghỉ phép</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Email..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày tạo (từ)</CFormLabel>
                      <CFormInput
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                        type="date"
                        placeholder="Ngày tạo (từ)"
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày tạo (đến)</CFormLabel>
                      <CFormInput
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                        type="date"
                        placeholder="Ngày tạo (đến)"
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Chưa duyệt</option>
                        <option value="1">Đã duyệt</option>
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
              <Link to="/users/leave/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Phiếu nghỉ phép</strong>
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
                  <CTableHeaderCell scope="col"> Nhân viên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian tạo </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian nghỉ phép </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian duyệt </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Người duyệt </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {leaves.length > 0 ? (
                  leaves.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.user.data ? (
                          <Link to={`/users/view?id=${item.attributes.user.data.id}`}>
                            {item.attributes.user.data.attributes.email}
                          </Link>
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.createdAt}</CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.from} - {item.attributes.to}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.approved ? (
                          <CBadge color="success">Đã duyệt</CBadge>
                        ) : (
                          <CBadge color="danger">Chưa duyệt</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.approved_time}</CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.approved_user.data ? (
                          <Link
                            to={`/users/leave/view?id=${item.attributes.approved_user.data.id}`}
                          >
                            {item.attributes.approved_user.data.attributes.email}
                          </Link>
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            Hành động
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/users/leave/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                            {!item.attributes.approved ? (
                              <>
                                <CDropdownItem href={`/users/leave/edit?id=${item.id}`}>
                                  <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                                </CDropdownItem>
                                <CDropdownItem
                                  href="#"
                                  onClick={handleClickApproved}
                                  data-id={item.id}
                                  data-name={item.id}
                                >
                                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                                </CDropdownItem>
                                <CDropdownItem
                                  href="#"
                                  onClick={handleClickDelete}
                                  data-id={item.id}
                                  data-name={item.id}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Xóa
                                </CDropdownItem>
                              </>
                            ) : (
                              <></>
                            )}
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
