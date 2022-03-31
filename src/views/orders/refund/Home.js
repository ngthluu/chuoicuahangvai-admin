import React from 'react'
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

import PropTypes from 'prop-types'

const ordersList = [
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 0,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 1,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 1,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 1,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 0,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 1,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 0,
  },
  {
    code: '#ORDER2901001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '01234567890',
    customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TPHCM',
    order_date: '25/09/2021',
    total_cost: '1.000.000đ',
    status: 0,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Đã hủy</CBadge>
  }
  return <CBadge color="success">Hoàn tất</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const Home = () => {
  return (
    <CRow>
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
                      <CFormLabel>Ngày trả (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày trả (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày trả (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày trả (đến)" />
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
                  <CTableHeaderCell scope="col"> Khách hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày trả </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tổng giá trị </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {ordersList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/orders/refund/view?id=${index}`}>{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <FontAwesomeIcon icon={faUser} /> <Link to="#">{item.customer_name}</Link>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faPhone} /> {item.customer_phone}
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faAddressBook} /> {item.customer_address}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell> {item.order_date} </CTableDataCell>
                    <CTableDataCell> {item.total_cost} </CTableDataCell>
                    <CTableDataCell>
                      <Status status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/orders/refund/view?id=${index}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/orders/refund/edit?id=${index}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
