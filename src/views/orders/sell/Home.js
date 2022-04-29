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
  faFilePdf,
  faUser,
  faPhone,
  faAddressBook,
  faSearch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'
import InputDropdownSearch from 'src/views/template/InputDropdownSearch'
import SelectFetchData from 'src/views/template/SelectFetchData'

const Home = () => {
  const [ordersList, setOrdersList] = useState([])

  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterCustomer, setFilterCustomer] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      createdAt: {
        $gte: filterFrom,
        $lte: filterTo,
      },
      branch: { id: { $eq: filterBranch } },
      customer: { id: { $eq: filterCustomer } },
      type: { $eq: filterType },
      order_statuses: { status: { $eq: filterStatus } },
    }
    if (filterFrom === '' && filterTo === '') {
      delete filters.createdAt
    } else {
      if (filterFrom === '') delete filters.createdAt.$gte
      if (filterTo === '') delete filters.createdAt.$lte
    }
    if (filterBranch === '') delete filters.branch
    if (filterCustomer === '') delete filters.customer
    if (filterType === '') delete filters.type
    if (filterStatus === '') delete filters.order_statuses
    return filters
  }

  const fetchData = async () => {
    const query = qs.stringify(
      {
        filters: buildFilters(),
        sort: ['createdAt:desc'],
        populate: [
          'customer',
          'branch',
          'order_statuses',
          'order_invoice',
          'order_invoice.order_payment_invoices',
        ],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/orders?${query}`)
    setOrdersList(
      response.data.data.map((item) => {
        item.attributes.status = {
          data: item.attributes.order_statuses.data.sort((a, b) => {
            return Date.parse(a.attributes.createdAt) < Date.parse(b.attributes.createdAt) ? 1 : -1
          })[0],
        }
        return item
      }),
    )
    setTotalItems(response.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterFrom, filterTo, filterBranch, filterCustomer, filterType, filterStatus])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý đơn bán hàng</h4>
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
                    <CFormLabel>Loại thanh toán</CFormLabel>
                    <CFormSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                      <option value="">Chọn loại</option>
                      <option value="cod">COD</option>
                      <option value="online">Online (qua VNPAY)</option>
                      <option value="pos">Mua tại quầy</option>
                    </CFormSelect>
                  </div>
                  <div className="p-1">
                    <CFormLabel>Trạng thái</CFormLabel>
                    <CFormSelect
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="initialize">Khởi tạo</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="packaged">Đã đóng gói</option>
                      <option value="delivery">Đang vận chuyển</option>
                      <option value="success">Thành công</option>
                      <option value="return">Trả về</option>
                      <option value="canceled">Đã hủy</option>
                    </CFormSelect>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex justify-content-between">
                <Link to="#">
                  <CButton color="info" className="text-white w-100 mb-2">
                    <FontAwesomeIcon icon={faFilePdf} /> <strong>Xuất PDF</strong>
                  </CButton>
                </Link>
                <div className="p-1"></div>
                <Link to="/orders/sell/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Đơn hàng</strong>
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
            <CTable align="middle" bordered responsive>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hóa đơn </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Khách hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày đặt </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá trị (đ) </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Đã thanh toán (đ) </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nợ (đ) </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.length > 0 ? (
                  ordersList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/orders/sell/view?id=${item.id}`}>
                          {`${item.attributes.type.toUpperCase()}#${item.id}`}
                        </Link>
                      </CTableDataCell>
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
                      <CTableDataCell>{item.attributes.branch.data.attributes.name}</CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.customer ? (
                          <div>
                            <div>
                              <FontAwesomeIcon icon={faUser} />
                              <Link to={`/customers/view?id=${item.attributes.customer.data.id}`}>
                                {item.attributes.customer.data.attributes.username}
                              </Link>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faPhone} />
                              {item.attributes.customer.data.attributes.phone}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell> {item.attributes.createdAt} </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.status.data.attributes.status === 'initialize' ? (
                          <CBadge color="warning">
                            {item.attributes.status.data.attributes.status.toUpperCase()}
                          </CBadge>
                        ) : item.attributes.status.data.attributes.status === 'confirmed' ||
                          item.attributes.status.data.attributes.status === 'packaged' ||
                          item.attributes.status.data.attributes.status === 'delivery' ? (
                          <CBadge color="primary">
                            {item.attributes.status.data.attributes.status.toUpperCase()}
                          </CBadge>
                        ) : item.attributes.status.data.attributes.status === 'return' ||
                          item.attributes.status.data.attributes.status === 'canceled' ? (
                          <CBadge color="danger">
                            {item.attributes.status.data.attributes.status.toUpperCase()}
                          </CBadge>
                        ) : (
                          <CBadge color="success">
                            {item.attributes.status.data.attributes.status.toUpperCase()}
                          </CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.order_invoice.data
                          ? item.attributes.order_invoice.data.attributes.price.toLocaleString()
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.order_invoice.data
                          ? item.attributes.order_invoice.data.attributes.order_payment_invoices.data
                              .reduce((prev, cur) => prev + parseFloat(cur.attributes.amount), 0)
                              .toLocaleString()
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.order_invoice.data
                          ? (
                              item.attributes.order_invoice.data.attributes.price -
                              item.attributes.order_invoice.data.attributes.order_payment_invoices.data.reduce(
                                (prev, cur) => prev + parseFloat(cur.attributes.amount),
                                0,
                              )
                            ).toLocaleString()
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            Hành động
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/orders/sell/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
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
