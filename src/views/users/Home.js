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
import { faEye, faEdit, faSearch, faPlus, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SelectFetchData from 'src/views/template/SelectFetchData'
import SmartPagination from 'src/views/template/SmartPagination'
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

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

  // Permission stuffs
  const moduleName = 'user'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionEdit, setPermissionEdit] = useState(false)
  const [permissionResetPassword, setPermissionResetPassword] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionEdit(await checkPermission(cookies, moduleName, 'edit'))
    setPermissionResetPassword(await checkPermission(cookies, moduleName, 'reset_password'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
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

  const [resetPasswordModalTargetId, setResetPasswordModalTargetId] = useState('')
  const [resetPasswordModalTargetName, setResetPasswordModalTargetName] = useState('')
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false)
  const handleClickResetPassword = (e) => {
    e.preventDefault()
    setResetPasswordModalTargetId(e.currentTarget.getAttribute('data-id'))
    setResetPasswordModalTargetName(e.currentTarget.getAttribute('data-name'))
    setResetPasswordModalVisible(!resetPasswordModalVisible)
  }

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="X??a nh??n vi??n"
        content={`B???n c?? mu???n x??a nh??n vi??n ${deleteModalTargetName} kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/users`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <Modal
        visible={resetPasswordModalVisible}
        visibleAction={setResetPasswordModalVisible}
        title="Reset m???t kh???u nh??n vi??n"
        content={`B???n c?? mu???n reset m???t kh???u nh??n vi??n ${resetPasswordModalTargetName} v??? 123456 kh??ng ?`}
        id={resetPasswordModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-reset-password`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Qu???n l?? nh??n vi??n</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>T??m ki???m</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Email..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>C???a h??ng</CFormLabel>
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
                      <CFormLabel>Ch???c v???</CFormLabel>
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
              {permissionAdd ? (
                <Link to="/users/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Nh??n vi??n</strong>
                  </CButton>
                </Link>
              ) : (
                <></>
              )}
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
                  <CTableHeaderCell scope="col"> T??n nh??n vi??n </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ch???c v??? </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> C???a h??ng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> H??nh ?????ng </CTableHeaderCell>
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
                            H??nh ?????ng
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/users/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                            {permissionEdit ? (
                              <CDropdownItem href={`/users/edit?id=${item.id}`}>
                                <FontAwesomeIcon icon={faEdit} /> Ch???nh s???a
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
                            {permissionResetPassword ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickResetPassword}
                                data-id={item.id}
                                data-name={item.username}
                              >
                                <FontAwesomeIcon icon={faUndo} /> Reset m???t kh???u
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
                            {permissionDelete ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={item.username}
                              >
                                <FontAwesomeIcon icon={faTrash} /> X??a
                              </CDropdownItem>
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
                    <CTableDataCell colSpan={'100%'}>Ch??a c?? d??? li???u</CTableDataCell>
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
