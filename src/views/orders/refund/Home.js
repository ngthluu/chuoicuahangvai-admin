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
  CBadge,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faPlus, faFileExcel, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'
import InputDropdownSearch from 'src/views/template/InputDropdownSearch'
import SelectFetchData from 'src/views/template/SelectFetchData'
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [ordersList, setOrdersList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterCustomer, setFilterCustomer] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [{ id: { $containsi: filterKeySearch } }],
      createdAt: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      branch: { id: { $eq: filterBranch } },
      customer: { id: { $eq: filterCustomer } },
      current_status: { $eq: filterStatus === '1' },
    }
    if (filterKeySearch === '') delete filters.$or
    if (filterFrom === '' && filterTo === '') {
      delete filters.createdAt
    } else {
      if (filterFrom === '') delete filters.createdAt.$gte
      if (filterTo === '') delete filters.createdAt.$lte
    }
    if (filterBranch === '') delete filters.branch
    if (filterCustomer === '') delete filters.customer
    if (filterStatus === '') delete filters.current_status
    return filters
  }

  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  // Permission stuffs
  const moduleName = 'refund'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionExportExcel, setPermissionExportExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionExportExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        filters: buildFilters(),
        sort: ['createdAt:desc'],
        populate: ['customer', 'branch', 'refund_invoice'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/refunds?${query}`)
    setOrdersList(response.data.data)
    setTotalItems(response.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterFrom, filterTo, filterBranch, filterCustomer, filterStatus])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/refunds-export?${query}`,
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
      <ToastContainer />
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Qu???n l?? ????n tr??? h??ng</h4>
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
                      <CFormLabel>Ng??y tr??? (t???)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ng??y tr??? (t???)"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ng??y tr??? (?????n)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ng??y tr??? (?????n)"
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
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
                      <CFormLabel>Kh??ch h??ng</CFormLabel>
                      <InputDropdownSearch
                        placeholder="T??m ki???m kh??ch h??ng"
                        ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/customer`}
                        ajaxDataPopulate={['name']}
                        ajaxDataGetFilters={(value) => {
                          return {
                            $or: [
                              {
                                name: {
                                  firstname: { $containsi: value },
                                  lastname: { $containsi: value },
                                },
                              },
                              { phone: { $containsi: value } },
                            ],
                          }
                        }}
                        ajaxDataGetItemName={(item) =>
                          `${item.phone} - ${item.name.firstname} ${item.name.lastname}`
                        }
                        handleNotFound={() => toast.error('Kh??ng t??m th???y kh??ch h??ng n??y !!!')}
                        handleFound={(item) => setFilterCustomer(item.id)}
                        setTextNameAfterFound={true}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Tr???ng th??i</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Ch???n tr???ng th??i</option>
                        <option value="0">Ch??a x??c nh???n</option>
                        <option value="1">???? x??c nh???n</option>
                      </CFormSelect>
                    </div>
                  </div>
                </CForm>
              </div>
              <div className="d-block d-md-flex justify-content-between">
                {permissionExportExcel ? (
                  <Link to="#">
                    <CButton
                      color="info"
                      className="text-white w-100 mb-2"
                      onClick={handleExportExcel}
                    >
                      <FontAwesomeIcon icon={faFileExcel} /> <strong>Xu???t Excel</strong>
                    </CButton>
                  </Link>
                ) : (
                  <></>
                )}
                <div className="p-1"></div>
                {permissionAdd ? (
                  <Link to="/orders/refund/add">
                    <CButton color="info" className="text-white w-100">
                      <FontAwesomeIcon icon={faPlus} /> <strong>????n tr??? h??ng</strong>
                    </CButton>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
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
                  <CTableHeaderCell scope="col"> H??a ????n </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> C???a h??ng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Kh??ch h??ng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ng??y t???o </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> C???p nh???t cu???i </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.length > 0 ? (
                  ordersList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/orders/refund/view?id=${item.id}`}>{`REFUND#${item.id}`}</Link>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.refund_invoice.data ? (
                          <Link
                            to={`/orders/refund/view_invoice?id=${item.attributes.refund_invoice.data.id}`}
                          >
                            {`R-INVOICE#${item.attributes.refund_invoice.data.id}`}
                          </Link>
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.branch.data.attributes.name}</CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.customer.data ? (
                          <>
                            <div>
                              <FontAwesomeIcon icon={faUser} />{' '}
                              <Link to={`/customers/view?id=${item.attributes.customer.data.id}`}>
                                {item.attributes.customer.data.attributes.username}
                              </Link>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faPhone} />{' '}
                              {item.attributes.customer.data.attributes.phone}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell> {item.attributes.createdAt} </CTableDataCell>
                      <CTableDataCell>
                        {!item.attributes.current_status ? (
                          <CBadge color="warning">Ch??a x??c nh???n</CBadge>
                        ) : (
                          <CBadge color="success">???? x??c nh???n v?? nh???p kho</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.updatedAt}</CTableDataCell>
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
