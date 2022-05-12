import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSearch, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import { checkPermission } from 'src/lib/permission'

const Home = () => {
  const [activeKey, setActiveKey] = useState(2)
  const [invoicesList, setInvoicesList] = useState([])
  const [chartData, setChartData] = useState([])

  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')

  const buildFilters = () => {
    let filters = {
      createdAt: {
        $gte: filterFrom,
        $lte: filterTo,
      },
    }
    if (filterFrom === '' && filterTo === '') {
      delete filters.createdAt
    } else {
      if (filterFrom === '') delete filters.createdAt.$gte
      if (filterTo === '') delete filters.createdAt.$lte
    }
    return filters
  }

  // Permission stuffs
  const moduleName = 'statisticsRevenue'
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
        sort: ['createdAt:desc'],
        filters: buildFilters(),
        populate: ['order', 'customer_name', 'products', 'order_payment_invoices'],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/order-invoices?${query}`,
    )
    const invoices = response.data.data.map((item) => {
      item = {
        ...item,
        date: new Date(item.attributes.createdAt).toISOString().split('T')[0],
        total: item.attributes.price,
        revenue: item.attributes.order_payment_invoices.data.reduce(
          (prev, cur) => prev + parseFloat(cur.attributes.amount),
          0,
        ),
        debt:
          item.attributes.price -
          item.attributes.order_payment_invoices.data.reduce(
            (prev, cur) => prev + parseFloat(cur.attributes.amount),
            0,
          ),
      }
      return item
    })
    setInvoicesList(invoices)
    const charts = invoices.reduce((prev, cur) => {
      if (Object.keys(prev).includes(cur.date)) return prev
      prev[cur.date] = {
        total: invoices.filter((g) => g.date === cur.date).reduce((p, c) => p + c.total, 0),
        revenue: invoices.filter((g) => g.date === cur.date).reduce((p, c) => p + c.revenue, 0),
        debt: invoices.filter((g) => g.date === cur.date).reduce((p, c) => p + c.debt, 0),
      }
      return prev
    }, {})
    setChartData(charts)
  }

  useEffect(() => {
    fetchData()
  }, [filterFrom, filterTo])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/statistics-revenue-export?${query}`,
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
                <h4 className="mb-3">Doanh thu / nợ</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
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
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <>
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 1} onClick={() => setActiveKey(1)}>
                    Dạng bảng
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    Dạng biểu đồ
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CTable align="middle" bordered responsive>
                    <CTableHead align="middle">
                      <CTableRow>
                        <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Hóa đơn </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Ngày đặt </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Giá trị (đ) </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Đã thanh toán (đ) </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Nợ (đ) </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody align="middle">
                      {invoicesList.length > 0 ? (
                        invoicesList.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell> {index + 1} </CTableDataCell>
                            <CTableDataCell>
                              <Link to={`/orders/sell/view_invoice?id=${item.id}`}>
                                {`S-INVOICE#${item.id}`}
                              </Link>
                            </CTableDataCell>
                            <CTableDataCell>
                              {new Date(item.attributes.createdAt).toISOString().split('T')[0]}
                            </CTableDataCell>
                            <CTableDataCell>{item.total.toLocaleString()}</CTableDataCell>
                            <CTableDataCell>{item.revenue.toLocaleString()}</CTableDataCell>
                            <CTableDataCell>{item.debt.toLocaleString()}</CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan={'100%'}>Chưa có dữ liệu</CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CTabPane>
                <CTabPane role="tabpanel" visible={activeKey === 2}>
                  <CChart
                    type="line"
                    style={{ marginTop: 30 }}
                    data={{
                      labels: Object.entries(chartData).map(([key, value]) => key),
                      datasets: [
                        {
                          label: 'Doanh số',
                          backgroundColor: 'rgba(232, 72, 112, 0.2)',
                          borderColor: 'rgba(232, 72, 112, 1)',
                          pointBackgroundColor: 'rgba(232, 72, 112, 1)',
                          pointBorderColor: '#fff',
                          data: Object.entries(chartData).map(([key, value]) => value.total),
                        },
                        {
                          label: 'Doanh thu',
                          backgroundColor: 'rgba(72, 184, 232, 0.2)',
                          borderColor: 'rgba(72, 184, 232, 1)',
                          pointBackgroundColor: 'rgba(72, 184, 232, 1)',
                          pointBorderColor: '#fff',
                          data: Object.entries(chartData).map(([key, value]) => value.revenue),
                        },
                        {
                          label: 'Nợ',
                          backgroundColor: 'rgba(105, 189, 57, 0.2)',
                          borderColor: 'rgba(105, 189, 57, 1)',
                          pointBackgroundColor: 'rgba(105, 189, 57, 1)',
                          pointBorderColor: '#fff',
                          data: Object.entries(chartData).map(([key, value]) => value.debt),
                        },
                      ],
                    }}
                  />
                </CTabPane>
              </CTabContent>
            </>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
