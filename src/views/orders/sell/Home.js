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

import Modal from 'src/views/template/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [ordersList, setOrdersList] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

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
  }, [page])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý đơn bán hàng</h4>
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
                      <CFormLabel>Trạng thái</CFormLabel>
                      <CFormSelect options={['Chọn trạng thái']}></CFormSelect>
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
            <CTable align="middle" bordered>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hóa đơn </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chi nhánh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Khách hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày đặt </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá trị </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Đã thanh toán </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nợ </CTableHeaderCell>
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
                        {item.attributes.order_invoice.data.attributes.price}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.order_invoice.data.attributes.order_payment_invoices.data.reduce(
                          (prev, cur) => prev + parseFloat(cur.attributes.amount),
                          0,
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {
                          -item.attributes.order_invoice.data.attributes.order_payment_invoices.data.reduce(
                            (prev, cur) => prev + parseFloat(cur.attributes.amount),
                            -item.attributes.order_invoice.data.attributes.price,
                          )
                        }
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
