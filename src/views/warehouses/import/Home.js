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
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CBadge,
  CForm,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SelectFetchData from 'src/views/template/SelectFetchData'
import SmartPagination from 'src/views/template/SmartPagination'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [importsList, setImportsList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [{ id: { $containsi: filterKeySearch } }],
      branch: { id: { $eq: filterBranch } },
      submit_time: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      submit_status: filterStatus === '1',
    }
    if (filterKeySearch === '') delete filters.$or
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

  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  // Permission stuffs
  const moduleName = 'warehouseImport'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionEdit, setPermissionEdit] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionEdit(await checkPermission(cookies, moduleName, 'edit'))
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
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports?${query}`,
    )
    setImportsList(result.data.data)
    setTotalItems(result.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterBranch, filterFrom, filterTo, filterStatus])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Qu???n l?? phi???u nh???p kho</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>T??m ki???m</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="T??m ki???m ID..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ng??y nh???p kho (t???)</CFormLabel>
                      <CFormInput
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                        type="date"
                        placeholder="Ng??y nh???p kho (t???)"
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ng??y nh???p kho (?????n)</CFormLabel>
                      <CFormInput
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                        type="date"
                        placeholder="Ng??y nh???p kho (?????n)"
                      />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
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
                      <CFormLabel>Tr???ng th??i</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Ch???n tr???ng th??i</option>
                        <option value="0">Ch??a nh???p kho</option>
                        <option value="1">???? nh???p kho</option>
                      </CFormSelect>
                    </div>
                  </div>
                </CForm>
              </div>
              {permissionAdd ? (
                <Link to="/warehouses/import/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Phi???u nh???p kho</strong>
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
                  <CTableHeaderCell scope="col"> C???a h??ng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ng??y nh???p </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nh??n vi??n nh???p </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {importsList.length > 0 ? (
                  importsList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        {permissionEdit && !item.attributes.submit_status ? (
                          <Link to={`/warehouses/import/edit?id=${item.id}`}>IMPORT#{item.id}</Link>
                        ) : (
                          <Link to={`/warehouses/import/view?id=${item.id}`}>IMPORT#{item.id}</Link>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.branch.data.attributes.name}</CTableDataCell>
                      <CTableDataCell> {item.attributes.submit_time} </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.submit_user.data
                          ? item.attributes.submit_user.data.attributes.username
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.submit_status ? (
                          <CBadge color="success">???? nh???p v??o kho</CBadge>
                        ) : (
                          <CBadge color="danger">Ch??a nh???p v??o kho</CBadge>
                        )}
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
