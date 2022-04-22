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
import { faFilePdf, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [activeKey, setActiveKey] = useState(2)
  const [ordersList, setOrdersList] = useState([])
  const [chartData, setChartData] = useState([])

  const fetchData = async () => {
    const query = qs.stringify(
      {
        populate: [
          'customer',
          'branch',
          'order_statuses',
          'order_invoice',
          'order_invoice.order_payment_invoices',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/orders?${query}`)
    const orders = response.data.data.map((item) => {
      item = {
        ...item,
        date: new Date(item.attributes.createdAt).toISOString().split('T')[0],
        total: item.attributes.order_invoice.data.attributes.price,
        revenue: item.attributes.order_invoice.data.attributes.order_payment_invoices.data.reduce(
          (prev, cur) => prev + parseFloat(cur.attributes.amount),
          0,
        ),
        debt:
          item.attributes.order_invoice.data.attributes.price -
          item.attributes.order_invoice.data.attributes.order_payment_invoices.data.reduce(
            (prev, cur) => prev + parseFloat(cur.attributes.amount),
            0,
          ),
      }
      item.attributes.status = {
        data: item.attributes.order_statuses.data.sort((a, b) => {
          return Date.parse(a.attributes.createdAt) < Date.parse(b.attributes.createdAt) ? 1 : -1
        })[0],
      }
      return item
    })
    setOrdersList(orders)
    const charts = orders.reduce((prev, cur) => {
      if (Object.keys(prev).includes(cur.date)) return prev
      prev[cur.date] = {
        total: orders.filter((g) => g.date === cur.date).reduce((p, c) => p + c.total, 0),
        revenue: orders.filter((g) => g.date === cur.date).reduce((p, c) => p + c.revenue, 0),
        debt: orders.filter((g) => g.date === cur.date).reduce((p, c) => p + c.debt, 0),
      }
      return prev
    }, {})
    setChartData(charts)
  }

  useEffect(() => {
    fetchData()
  }, [])
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
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Mã đơn hàng..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày đặt (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày đặt (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày đặt (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày đặt (đến)" />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              <div className="d-block d-md-flex justify-content-between">
                <Link to="#">
                  <CButton color="info" className="text-white w-100 mb-2">
                    <FontAwesomeIcon icon={faFilePdf} /> <strong>Xuất PDF</strong>
                  </CButton>
                </Link>
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
                  <CTable align="middle" bordered>
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
                      {ordersList.length > 0 ? (
                        ordersList.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell> {index + 1} </CTableDataCell>
                            <CTableDataCell>
                              {item.attributes.order_invoice.data ? (
                                <Link
                                  to={`/orders/sell/view_invoice?id=${item.attributes.order_invoice.data.id}`}
                                >
                                  {`S-INVOICE#${item.attributes.order_invoice.data.id}`}
                                </Link>
                              ) : (
                                <></>
                              )}
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
