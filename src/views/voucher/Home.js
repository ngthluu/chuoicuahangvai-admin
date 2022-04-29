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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const getTypeValueText = (type, typeValue) => {
    switch (type) {
      case 'percent':
        return `Giảm giá ${typeValue.percent} %`
      case 'percent_limit':
        return `Giảm giá đơn hàng ${
          typeValue.percent
        } %, không vượt quá ${typeValue.limit.toLocaleString()} đ`
      case 'amount':
        return `Giảm giá đơn hàng ${typeValue.value.toLocaleString()} đ`
      default:
        return ''
    }
  }

  const getApplyForValueText = (applyFor, applyForValue) => {
    switch (applyFor) {
      case 'new_customers':
        return `Khách hàng mới (đăng kí 1 tháng)`
      case 'all_customers_limit_quantity':
        return `Tất cả khách hàng, giới hạn ${applyForValue.quantity} vouchers`
      default:
        return ''
    }
  }

  const [vouchersList, setVouchersList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterApplyFor, setFilterApplyFor] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      code: { $containsi: filterKeySearch },
      type: { $eq: filterType },
      apply_for: { $eq: filterApplyFor },
    }
    if (filterType === '') delete filters.type
    if (filterApplyFor === '') delete filters.apply_for
    if (filterKeySearch === '') delete filters.code
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const query = qs.stringify(
      { sort: ['createdAt:desc'], filters: buildFilters() },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/vouchers?${query}`)
    setVouchersList(response.data.data)
    setTotalItems(response.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterType, filterApplyFor])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý voucher</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Mã voucher..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Loại hình</CFormLabel>
                      <CFormSelect
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="">Chọn loại hình</option>
                        <option value="percent">Giảm giá tổng đơn hàng (%)</option>
                        <option value="percent_limit">
                          Giảm giá tổng đơn hàng, có giới hạn số tiền giảm (%)
                        </option>
                        <option value="amount">Giảm giá tổng đơn hàng (đ)</option>
                      </CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Loại áp dụng</CFormLabel>
                      <CFormSelect
                        value={filterApplyFor}
                        onChange={(e) => setFilterApplyFor(e.target.value)}
                      >
                        <option value="">Chọn loại áp dụng</option>
                        <option value="new_customers">Khách hàng mới (đăng kí 1 tháng)</option>
                        <option value="all_customers_limit_quantity">
                          Tất cả khách hàng, giới hạn vouchers
                        </option>
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
              <Link to="/voucher/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Voucher</strong>
                </CButton>
              </Link>
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
                  <CTableHeaderCell scope="col"> Mã </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá trị </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Áp dụng cho </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian bắt đầu </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian kết thúc </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {vouchersList.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.attributes.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {getTypeValueText(item.attributes.type, item.attributes.type_value)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {getApplyForValueText(
                        item.attributes.apply_for,
                        item.attributes.apply_for_value,
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{item.attributes.available_start_date}</CTableDataCell>
                    <CTableDataCell>{item.attributes.available_end_date}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/voucher/edit?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
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
