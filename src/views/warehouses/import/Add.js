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

const Add = () => {
  const [productsList, setProductsList] = useState([])

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

    const importPrice = document.getElementById('import-price').value
    const length = document.getElementById('length').value

    let newProductsList = [...productsList]
    let addFlag = true
    newProductsList.forEach((value) => {
      if (value.code === productId) {
        value.length += parseInt(length)
        value.total_price = parseInt(value.import_price) * parseInt(value.length)
        addFlag = false
      }
    })
    if (addFlag) {
      newProductsList.push({
        code: productId,
        name: productName,
        import_price: importPrice,
        length: parseInt(length),
        total_price: parseInt(importPrice) * parseInt(length),
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
            <h5>Thêm phiếu nhập kho</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mã số</CFormLabel>
                <CFormInput type="text" readOnly />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Kho</CFormLabel>
                <CFormSelect options={['Chọn kho']} required></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3 m-1 p-2 border">
              <CCol md={4}>
                <CFormLabel>Sản phẩm</CFormLabel>
                <CFormSelect
                  id="product"
                  required
                  options={[
                    { label: 'Chọn sản phẩm', value: '' },
                    { label: 'Sản phẩm A', value: '#PRO001' },
                    { label: 'Sản phẩm B', value: '#PRO002' },
                    { label: 'Sản phẩm C', value: '#PRO003' },
                  ]}
                ></CFormSelect>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel>Giá nhập</CFormLabel>
                <CFormInput id="import-price" type="number" placeholder="Giá nhập" />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={3}>
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
                      <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Giá nhập / đv </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chiều dài </CTableHeaderCell>
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
                          <Link to="#">{item.code}</Link>
                        </CTableDataCell>
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell> {item.import_price} </CTableDataCell>
                        <CTableDataCell> {item.length} </CTableDataCell>
                        <CTableDataCell> {item.total_price} </CTableDataCell>
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Ghi chú</CFormLabel>
                <CFormTextarea placeholder="Nhập ghi chú" rows="5"></CFormTextarea>
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/branches" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
