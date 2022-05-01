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
import { faEye, faEdit, faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SelectFetchData from 'src/views/template/SelectFetchData'
import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [usersList, setUsersList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterRole, setFilterRole] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [{ branch: { id: { $eq: filterBranch } } }, { branches: { id: { $eq: filterBranch } } }],
      role: { id: { $eq: filterRole } },
      email: { $containsi: filterKeySearch },
    }
    if (filterBranch === '') delete filters.$or
    if (filterRole === '') delete filters.role
    if (filterKeySearch === '') delete filters.email
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
        populate: ['role', 'branches', 'branch', 'name'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/user?${query}`)
    setUsersList(response.data.data)
    setTotalItems(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterBranch, filterRole])

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
    toast.success('Bạn đã xóa nhân viên thành công')
  }
  const handleDeleteError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  return (
    <CRow>
      <ToastContainer />
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa nhân viên"
        content={`Bạn có muốn xóa nhân viên ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/users`}
        triggerSuccess={handleDeleteSuccess}
        triggerError={handleDeleteError}
        action="delete"
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
                      <CFormLabel>Cửa hàng</CFormLabel>
                      <SelectFetchData
                        name="branch"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                        value={filterBranch}
                        setValue={setFilterBranch}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Chức vụ</CFormLabel>
                      <SelectFetchData
                        name="role"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-roles`}
                        value={filterRole}
                        setValue={setFilterRole}
                        processFetchDataResponse={(response) => {
                          return response.data.map((item) => {
                            return { id: item.id, name: item.name }
                          })
                        }}
                      ></SelectFetchData>
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
            <CTable align="middle" bordered responsive>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên nhân viên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chức vụ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {usersList.length > 0 ? (
                  usersList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/users/view?id=${item.id}`}>{item.email}</Link>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.name ? `${item.name.firstname} ${item.name.lastname}` : ''}
                      </CTableDataCell>
                      <CTableDataCell> {item.role.name} </CTableDataCell>
                      <CTableDataCell>
                        {item.role.name === 'Branch Manager'
                          ? item.branches.map((el) => el.name).join(', ')
                          : item.branch
                          ? item.branch.name
                          : ''}
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
                            <CDropdownItem
                              href="#"
                              onClick={handleClickDelete}
                              data-id={item.id}
                              data-name={item.username}
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
