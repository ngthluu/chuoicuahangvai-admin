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
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

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

  // Permission stuffs
  const moduleName = 'customer'
  const [cookies, setCookies] = useCookies([])
  const [permissionChangeStatus, setPermissionChangeStatus] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const [permissionExpotExcel, setPermissionExpotExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionChangeStatus(await checkPermission(cookies, moduleName, 'change_status'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
    setPermissionExpotExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        sort: ['createdAt:desc'],
        filters: buildFilters(),
        populate: ['name'],
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
        title="X??a kh??ch h??ng"
        content={`B???n c?? mu???n x??a kh??ch h??ng ${deleteModalTargetName} kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/customer`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="C???p nh???t tr???ng th??i kh??ch h??ng"
        content={`B???n c?? mu???n c???p nh???t tr???ng th??i kh??ch h??ng ${submitModalTargetName} kh??ng ?`}
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
                <h4 className="mb-3">Qu???n l?? kh??ch h??ng</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>T??m ki???m</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="MSKH, H??? v?? t??n..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Tr???ng th??i</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Ch???n tr???ng th??i</option>
                        <option value="0">V??ng lai</option>
                        <option value="1">???? ????ng k??</option>
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
              {permissionExpotExcel ? (
                <Link to="#">
                  <CButton color="info" className="text-white w-100" onClick={handleExportExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> <strong>Xu???t Excel</strong>
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
                  <CTableHeaderCell scope="col"> H??? v?? t??n </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> S??? ??i???n tho???i </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> H??nh ?????ng </CTableHeaderCell>
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
                        {!item.blocked ? (
                          <CBadge color="success">???? ????ng k??</CBadge>
                        ) : (
                          <CBadge color="warning">V??ng lai</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            H??nh ?????ng
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/customers/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                            {permissionChangeStatus ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickSubmit}
                                data-id={item.id}
                                data-name={`${item.name.firstname} ${item.name.lastname}`}
                              >
                                {!item.blocked ? (
                                  <>
                                    <FontAwesomeIcon icon={faLock} /> Chuy???n sang kh??ch v??ng lai
                                  </>
                                ) : (
                                  <>
                                    <FontAwesomeIcon icon={faUnlock} /> Chuy???n sang kh??ch ????ng k??
                                  </>
                                )}
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
                            {permissionDelete ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={`${item.name.firstname} ${item.name.lastname}`}
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
