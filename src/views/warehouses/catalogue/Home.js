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
  CBadge,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faCheck,
  faTrash,
  faPlus,
  faFilePdf,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SelectFetchData from 'src/views/template/SelectFetchData'
import SmartPagination from 'src/views/template/SmartPagination'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [catalogueList, setCatalogueList] = useState([])

  const [filterBranch, setFilterBranch] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      branch: { id: { $eq: filterBranch } },
      submit_time: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      submit_status: filterStatus === '1',
    }
    if (filterBranch === '') delete filters.branch
    if (filterStatus === '') delete filters.submit_status
    if (filterFrom === '' && filterTo === '') {
      delete filters.submit_time
    } else {
      if (filterFrom === '') delete filters.submit_time.$gte
      if (filterTo === '') delete filters.submit_time.$lte
    }
    return filters
  }

  // Permission stuffs
  const moduleName = 'warehouseCatalogue'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionEdit, setPermissionEdit] = useState(false)
  const [permissionSubmit, setPermissionSubmit] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionEdit(await checkPermission(cookies, moduleName, 'edit'))
    setPermissionSubmit(await checkPermission(cookies, moduleName, 'submit'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        sort: ['createdAt:desc'],
        filters: buildFilters(),
        populate: ['branch', 'submit_user'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const result = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues?${query}`,
    )
    setCatalogueList(result.data.data)
    setTotalItems(result.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterBranch, filterFrom, filterTo, filterStatus])

  // Delete logic
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

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa phiếu kiểm kho"
        content={`Bạn có muốn xóa phiếu kiểm kho ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Kiểm kho"
        content={`Bạn có muốn kiểm kho với phiếu ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues/submit`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý phiếu kiểm kho</h4>
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
                    <CFormLabel>Ngày kiểm kho (từ)</CFormLabel>
                    <CFormInput
                      value={filterFrom}
                      onChange={(e) => setFilterFrom(e.target.value)}
                      type="date"
                      placeholder="Ngày kiểm kho (từ)"
                    />
                  </div>
                  <div className="p-1">
                    <CFormLabel>Ngày kiểm kho (đến)</CFormLabel>
                    <CFormInput
                      value={filterTo}
                      onChange={(e) => setFilterTo(e.target.value)}
                      type="date"
                      placeholder="Ngày kiểm kho (đến)"
                    />
                  </div>
                  <div className="p-1">
                    <CFormLabel>Trạng thái</CFormLabel>
                    <CFormSelect
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="0">Chưa kiểm kho</option>
                      <option value="1">Đã kiểm kho</option>
                    </CFormSelect>
                  </div>
                </div>
              </div>
              {permissionAdd ? (
                <Link to="/warehouses/catalogue/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Phiếu kiểm kho</strong>
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
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày kiểm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên kiểm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {catalogueList.length > 0 ? (
                  catalogueList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        {permissionEdit && !item.attributes.submit_status ? (
                          <Link to={`/warehouses/catalogue/edit?id=${item.id}`}>
                            CATALOUGE#{item.id}
                          </Link>
                        ) : (
                          <Link to={`/warehouses/catalogue/view?id=${item.id}`}>
                            CATALOUGE#{item.id}
                          </Link>
                        )}
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
                        {item.attributes.submit_status ? (
                          <CBadge color="success">Đã kiểm kho</CBadge>
                        ) : (
                          <CBadge color="danger">Chưa kiểm kho</CBadge>
                        )}
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
