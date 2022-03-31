import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCardFooter,
  CButton,
  CFormFeedback,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const OrderDetailsItem = (props) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <div>{props.title}</div>
      <div>{props.value}</div>
    </div>
  )
}
OrderDetailsItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.node,
}

const ordersDetails = {
  order_code: '#ORDER210921001',
  init_time: '22:08:15 21/09/2021',
  customer_code: '#KH001',
  customer_name: 'Nguyễn Văn A',
  customer_phone: '0383477379',
  customer_address: '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
}

const Add = () => {
  const [productsList, setProductsList] = useState([
    {
      name: 'Vải lanh',
      color: 'Xanh',
      material: 'Cotton',
      origin: 'Trung Quốc',
      width: '2m',
      price: 12000,
      length: 12,
      total_price: 12000 * 12,
    },
    {
      name: 'Vải lanh',
      color: 'Xanh',
      material: 'Cotton',
      origin: 'Trung Quốc',
      width: '2m',
      price: 12000,
      length: 12,
      total_price: 12000 * 12,
    },
    {
      name: 'Vải lanh',
      color: 'Xanh',
      material: 'Cotton',
      origin: 'Trung Quốc',
      width: '2m',
      price: 12000,
      length: 12,
      total_price: 12000 * 12,
    },
  ])

  const calculateTotalPrice = () => {
    let totalPrice = 0
    productsList.forEach((item) => {
      totalPrice += item.total_price
    })
    return totalPrice
  }

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin đơn hàng</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin đơn hàng</h6>
                <OrderDetailsItem
                  title="Mã đơn hàng: "
                  value={<strong>{ordersDetails.order_code}</strong>}
                />
                <OrderDetailsItem
                  title="Thời gian khởi tạo: "
                  value={<strong>{ordersDetails.init_time}</strong>}
                />
                <OrderDetailsItem
                  title="Trạng thái đơn hàng: "
                  value={<CFormSelect options={['Chọn trạng thái']}></CFormSelect>}
                />
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Thông tin người mua</h6>
                <OrderDetailsItem
                  title="Mã người mua: "
                  value={<Link to="#">{ordersDetails.customer_code}</Link>}
                />
                <OrderDetailsItem
                  title="Tên người mua: "
                  value={<strong>{ordersDetails.customer_name}</strong>}
                />
                <OrderDetailsItem
                  title="Số điện thoại: "
                  value={<strong>{ordersDetails.customer_phone}</strong>}
                />
                <OrderDetailsItem
                  title="Địa chỉ: "
                  value={<strong>{ordersDetails.customer_address}</strong>}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Sản phẩm </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Đơn giá </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Số mét </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tổng giá trị </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {productsList.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          <Link to="#">{item.name}</Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="mb-2">
                            <strong>Màu sắc: </strong> {item.color}
                          </div>
                          <div className="mb-2">
                            <strong>Chất liệu: </strong> {item.material}
                          </div>
                          <div className="mb-2">
                            <strong>Xuất xứ: </strong> {item.origin}
                          </div>
                          <div className="mb-2">
                            <strong>Chiều rộng: </strong> {item.width}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell> {item.price} / mét vuông </CTableDataCell>
                        <CTableDataCell>{item.length} </CTableDataCell>
                        <CTableDataCell>{item.total_price} </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> {calculateTotalPrice()} </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton
              href="/orders/sell"
              color="secondary"
              type="button"
              className="text-white ml-3"
            >
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
