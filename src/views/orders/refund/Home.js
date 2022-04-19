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
  faCheck,
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
        populate: ['customer', 'branch', 'refund_statuses', 'refund_invoice'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/refunds?${query}`)
    setOrdersList(
      response.data.data.map((item) => {
        item.attributes.status = {
          data: item.attributes.refund_statuses.data.sort((a, b) => {
            return Date.parse(a.attributes.update_time) < Date.parse(b.attributes.update_time)
              ? 1
              : -1
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

  // Submit logic
  const [submitModalTargetId, setSubmitModalTargetId] = useState('')
  const [submitModalTargetName, setSubmitModalTargetName] = useState('')
  const [submitModalVisible, setSubmitModalVisible] = useState(false)
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setSubmitModalTargetId(e.currentTarget.getAttribute('data-id'))
    setSubmitModalTargetName(e.currentTarget.getAttribute('data-name'))
    setSubmitModalVisible(!submitModalVisible)
  }
  const handleSubmitSuccess = () => {
    fetchData()
    toast.success('Bạn đã duyệt thành công')
  }
  const handleSubmitError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  return (
    <CRow>
      <ToastContainer />
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Duyệt đơn trả hàng"
        content={`Bạn có muốn duyệt đơn trả hàng và nhập kho với phiếu ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/refunds/submit`}
        triggerSuccess={handleSubmitSuccess}
        triggerError={handleSubmitError}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý đơn trả hàng</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Mã đơn hàng..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày tạo (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày tạo (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày tạo (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày tạo (đến)" />
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
                <Link to="/orders/refund/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Đơn trả hàng</strong>
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
                  <CTableHeaderCell scope="col"> Ngày tạo </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cập nhật cuối </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
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
                        {!item.attributes.status.data.attributes.update_status ? (
                          <CBadge color="warning">Chưa xác nhận</CBadge>
                        ) : (
                          <CBadge color="success">Đã xác nhận và nhập kho</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.status.data.attributes.update_time}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            Hành động
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={`/orders/refund/view?id=${item.id}`}>
                              <FontAwesomeIcon icon={faEye} /> Xem
                            </CDropdownItem>
                            {!item.attributes.status.data.attributes.update_status ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickSubmit}
                                data-id={item.id}
                                data-name={`REFUND#${item.id}`}
                              >
                                <FontAwesomeIcon icon={faCheck} /> Duyệt và nhập kho
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
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
