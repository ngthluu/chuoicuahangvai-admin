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

  const onChooseProduct = () => {
    let productSelect = document.getElementById('product')
    let index = productSelect.selectedIndex
    let optionChoose = productSelect.options[index]
    const remainLength = optionChoose.getAttribute('data-remain')

    document.getElementById('remain-length').value = remainLength
  }

  const handleDeleteProduct = (event) => {
    const productId = event.currentTarget.getAttribute('productid')
    let newProductsList = [...productsList]
    newProductsList = newProductsList.filter((value) => value.code !== productId)
    setProductsList(newProductsList)
  }

  const handleAddProduct = () => {
    let productSelect = document.getElementById('product')
    const productId = productSelect.value
    const productName = productSelect.options[productSelect.selectedIndex].innerHTML

    const length = document.getElementById('length').value

    let newProductsList = [...productsList]
    let addFlag = true
    newProductsList.forEach((value) => {
      if (value.code === productId) {
        value.length += parseInt(length)
        addFlag = false
      }
    })
    if (addFlag) {
      newProductsList.push({
        code: productId,
        name: productName,
        length: parseInt(length),
      })
    }
    setProductsList(newProductsList)
  }

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
                  value={<CFormSelect options={['Chọn khách hàng']}></CFormSelect>}
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
            <CRow className="mb-3 m-1 p-2 border">
              <CCol md={5}>
                <CFormLabel>Sản phẩm</CFormLabel>
                <CFormSelect id="product" required onChange={onChooseProduct}>
                  <option value=""> Chọn sản phẩm </option>
                  <option value="#PRO001" data-remain="123">
                    Sản phẩm A
                  </option>
                  <option value="#PRO002" data-remain="12">
                    Sản phẩm B
                  </option>
                  <option value="#PRO003" data-remain="1212">
                    Sản phẩm C
                  </option>
                </CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={5}>
                <CFormLabel>Chiều dài</CFormLabel>
                <CFormInput id="length" type="number" placeholder="Chiều dài" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={2} className="d-flex flex-column">
                <CButton
                  color="info"
                  type="button"
                  className="mt-auto text-white"
                  onClick={handleAddProduct}
                >
                  <FontAwesomeIcon icon={faPlus} /> <strong>Sản phẩm</strong>
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" responsive bordered>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Sản phẩm </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Đơn giá </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Số mét </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <FontAwesomeIcon icon={faTrash} />
                      </CTableHeaderCell>
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
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            className="text-white"
                            onClick={handleDeleteProduct}
                            productid={item.code}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> Tổng giá trị </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> {calculateTotalPrice()} </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> </CTableHeaderCell>
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
              href="/orders/refund"
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
