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

import SmartPagination from 'src/views/template/SmartPagination'
import { useCookies } from 'react-cookie'
import { checkPermission } from 'src/lib/permission'

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

  // Permission stuffs
  const moduleName = 'userLeave'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionEdit, setPermissionEdit] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const [permissionApprove, setPermissionApprove] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionEdit(await checkPermission(cookies, moduleName, 'edit'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
    setPermissionApprove(await checkPermission(cookies, moduleName, 'approve'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
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

  const [approvedModalTargetId, setApprovedModalTargetId] = useState('')
  const [approvedModalTargetName, setApprovedModalTargetName] = useState('')
  const [approvedModalVisible, setApprovedModalVisible] = useState(false)
  const handleClickApproved = (e) => {
    e.preventDefault()
    setApprovedModalTargetId(e.currentTarget.getAttribute('data-id'))
    setApprovedModalTargetName(e.currentTarget.getAttribute('data-name'))
    setApprovedModalVisible(!approvedModalVisible)
  }

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="X??a phi???u ngh??? ph??p"
        content={`B???n c?? mu???n x??a phi???u ngh??? ph??p n??y kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <Modal
        visible={approvedModalVisible}
        visibleAction={setApprovedModalVisible}
        title="Duy???t phi???u ngh??? ph??p"
        content={`B???n c?? mu???n duy???t phi???u ngh??? ph??p n??y kh??ng ?`}
        id={approvedModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/user-leaves-approve`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Phi???u ngh??? ph??p</h4>
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
                      <CFormLabel>Ng??y t???o (t???)</CFormLabel>
                      <CFormInput
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                        type="date"
                        placeholder="Ng??y t???o (t???)"
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ng??y t???o (?????n)</CFormLabel>
                      <CFormInput
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                        type="date"
                        placeholder="Ng??y t???o (?????n)"
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Tr???ng th??i</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Ch???n tr???ng th??i</option>
                        <option value="0">Ch??a duy???t</option>
                        <option value="1">???? duy???t</option>
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
              {permissionAdd ? (
                <Link to="/users/leave/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Phi???u ngh??? ph??p</strong>
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
                  <CTableHeaderCell scope="col"> Nh??n vi??n </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Th???i gian t???o </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Th???i gian ngh??? ph??p </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Th???i gian duy???t </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ng?????i duy???t </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> H??nh ?????ng </CTableHeaderCell>
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
                          <CBadge color="success">???? duy???t</CBadge>
                        ) : (
                          <CBadge color="danger">Ch??a duy???t</CBadge>
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
                            H??nh ?????ng
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/users/leave/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                            {!item.attributes.approved ? (
                              <>
                                {permissionEdit ? (
                                  <CDropdownItem href={`/users/leave/edit?id=${item.id}`}>
                                    <FontAwesomeIcon icon={faEdit} /> Ch???nh s???a
                                  </CDropdownItem>
                                ) : (
                                  <></>
                                )}
                                {permissionApprove ? (
                                  <CDropdownItem
                                    href="#"
                                    onClick={handleClickApproved}
                                    data-id={item.id}
                                    data-name={item.id}
                                  >
                                    <FontAwesomeIcon icon={faCheck} /> Duy???t
                                  </CDropdownItem>
                                ) : (
                                  <></>
                                )}
                                {permissionDelete ? (
                                  <CDropdownItem
                                    href="#"
                                    onClick={handleClickDelete}
                                    data-id={item.id}
                                    data-name={item.id}
                                  >
                                    <FontAwesomeIcon icon={faTrash} /> X??a
                                  </CDropdownItem>
                                ) : (
                                  <></>
                                )}
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
