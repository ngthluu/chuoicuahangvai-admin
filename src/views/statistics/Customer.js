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
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

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

  // Permission stuffs
  const moduleName = 'statisticsSoldvolume'
  const [cookies, setCookies] = useCookies([])
  const [permissionExportExcel, setPermissionExportExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionExportExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
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

  const handleExportExcel = async () => {
    const query = qs.stringify(
      {
        filters: buildFilters(),
        populate: [],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/statistics-customer-export?${query}`,
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
                <h4 className="mb-3">Kh??ch h??ng ????ng k??</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Ng??y (t???)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ng??y (t???)"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ng??y (?????n)</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder="Ng??y (?????n)"
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
                      <FontAwesomeIcon icon={faFileExcel} /> <strong>Xu???t Excel</strong>
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
                    D???ng b???ng
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    D???ng bi???u ?????
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CTable align="middle" style={{ marginTop: 30 }} bordered responsive>
                    <CTableHead align="middle">
                      <CTableRow>
                        <CTableHeaderCell scope="col"> Ng??y </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> S??? l?????t ????ng k?? </CTableHeaderCell>
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
                          <CTableDataCell colSpan={'100%'}>Ch??a c?? d??? li???u</CTableDataCell>
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
                          label: 'S??? l?????t ????ng k??',
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
