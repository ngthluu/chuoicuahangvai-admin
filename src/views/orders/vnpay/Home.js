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
  CFormLabel,
  CFormInput,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import SmartPagination from 'src/views/template/SmartPagination'
import SelectFetchData from 'src/views/template/SelectFetchData'
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [transactionsList, setTransactionsList] = useState([])

  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterBranch, setFilterBranch] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      createdAt: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      orders: {
        branch: { id: { $eq: filterBranch } },
      },
    }
    if (filterFrom === '' && filterTo === '') {
      delete filters.createdAt
    } else {
      if (filterFrom === '') delete filters.createdAt.$gte
      if (filterTo === '') delete filters.createdAt.$lte
    }
    if (filterBranch === '') delete filters.orders
    return filters
  }

  // Permission stuffs
  const moduleName = 'transactionVNPAY'
  const [cookies, setCookies] = useCookies([])
  const [permissionExportExcel, setPermissionExportExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionExportExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        filters: buildFilters(),
        sort: ['createdAt:desc'],
        populate: ['orders'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/order-payment-vnpays?${query}`,
    )
    setTransactionsList(response.data.data)
    setTotalItems(response.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterFrom, filterTo, filterBranch])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/order-payment-vnpays-export?${query}`,
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
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Giao dịch VNPAY</h4>
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
                    <CFormLabel>Ngày đặt (từ)</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày đặt (từ)"
                      value={filterFrom}
                      onChange={(e) => setFilterFrom(e.target.value)}
                    />
                  </div>
                  <div className="p-1">
                    <CFormLabel>Ngày đặt (đến)</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày đặt (đến)"
                      value={filterTo}
                      onChange={(e) => setFilterTo(e.target.value)}
                    />
                  </div>
                </div>
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
                  <CTableHeaderCell scope="col"> Mã giao dịch </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá trị </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Đơn hàng </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {transactionsList.length > 0 ? (
                  transactionsList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell> {item.attributes.transaction_code} </CTableDataCell>
                      <CTableDataCell>
                        {parseInt(item.attributes.amount).toLocaleString()} đ
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.orders.data
                          .map((el) => `${el.attributes.type.toUpperCase()}#${el.id}`)
                          .join(', ')}
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
