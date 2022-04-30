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
  const [customers, setCustomers] = useState([])

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

  const fetchData = async () => {
    const query = qs.stringify(
      {
        filters: buildFilters(),
        populate: [],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/customer?${query}`)
    const customersData = response.data.data.map((item) => {
      return { date: new Date(item.createdAt).toISOString().split('T')[0] }
    })
    const data = customersData.reduce((prev, cur) => {
      if (Object.keys(prev).includes(cur.date)) return prev
      prev[cur.date] = {
        total: customersData.filter((g) => g.date === cur.date).reduce((p, c) => p + 1, 0),
      }
      return prev
    }, {})
    setCustomers(data)
  }

  useEffect(() => {
    fetchData()
  }, [filterFrom, filterTo])
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Khách hàng đăng ký</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Ngày (từ)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ngày (từ)"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày (đến)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ngày (đến)"
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                      />
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
                  <CTable align="middle" style={{ marginTop: 30 }} bordered responsive>
                    <CTableHead align="middle">
                      <CTableRow>
                        <CTableHeaderCell scope="col"> Ngày </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Số lượt đăng ký </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody align="middle">
                      {Object.entries(customers).length > 0 ? (
                        Object.entries(customers).map(([date, count]) => (
                          <CTableRow key={date}>
                            <CTableDataCell>{date}</CTableDataCell>
                            <CTableDataCell>{count.total}</CTableDataCell>
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
                    type="bar"
                    style={{ marginTop: 30 }}
                    data={{
                      labels: Object.entries(customers).map(([date, count]) => `${date}`),
                      datasets: [
                        {
                          label: 'Số lượt đăng ký',
                          backgroundColor: '#f87979',
                          data: Object.entries(customers).map(([date, count]) => count.total),
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
