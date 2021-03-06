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
                <h4 className="mb-3">Quản lý đơn trả hàng</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Tìm kiếm ID..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
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
                      <CFormLabel>Ngày trả (từ)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ngày trả (từ)"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày trả (đến)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ngày trả (đến)"
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
                      <CFormLabel>Khách hàng</CFormLabel>
                      <InputDropdownSearch
                        placeholder="Tìm kiếm khách hàng"
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
                        handleNotFound={() => toast.error('Không tìm thấy khách hàng này !!!')}
                        handleFound={(item) => setFilterCustomer(item.id)}
                        setTextNameAfterFound={true}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Chưa xác nhận</option>
                        <option value="1">Đã xác nhận</option>
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
                      <FontAwesomeIcon icon={faFileExcel} /> <strong>Xuất Excel</strong>
                    </CButton>
                  </Link>
                ) : (
                  <></>
                )}
                <div className="p-1"></div>
                {permissionAdd ? (
                  <Link to="/orders/refund/add">
                    <CButton color="info" className="text-white w-100">
                      <FontAwesomeIcon icon={faPlus} /> <strong>Đơn trả hàng</strong>
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
                  <CTableHeaderCell scope="col"> Hóa đơn </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Khách hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày tạo </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cập nhật cuối </CTableHeaderCell>
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
                          <CBadge color="warning">Chưa xác nhận</CBadge>
                        ) : (
                          <CBadge color="success">Đã xác nhận và nhập kho</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.attributes.updatedAt}</CTableDataCell>
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
