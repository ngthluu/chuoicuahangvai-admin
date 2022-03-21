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
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CImage,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const query = qs.stringify(
        { populate: ['product', 'pattern', 'stretch', 'width', 'origin', 'images'] },
        { encodeValuesOnly: true },
      )
      const response = await axios.get(
        `${process.env.REACT_APP_STRAPI_URL}/api/product-skus?${query}`,
      )
      console.log(response.data.data)
      setProductsList(response.data.data)
    }
    fetchData()
  }, [])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý sản phẩm</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Tìm kiếm theo từ khóa..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Màu sắc</CFormLabel>
                      <CFormSelect options={['Chọn màu sắc']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Kiểu mẫu</CFormLabel>
                      <CFormSelect options={['Chọn kiểu mẫu']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              <Link to="/products/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Sản phẩm</strong>
                </CButton>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" responsive bordered>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hình ảnh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> SKU </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thông tin </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {productsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <CImage
                        src={`${process.env.REACT_APP_STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                        width="200"
                      ></CImage>
                    </CTableDataCell>
                    <CTableDataCell>{item.attributes.product.data.attributes.name}</CTableDataCell>
                    <CTableDataCell> {item.attributes.sku} </CTableDataCell>
                    <CTableDataCell> {item.attributes.price} </CTableDataCell>
                    <CTableDataCell align="left">
                      <div>
                        <strong>Màu sắc: </strong> {}
                      </div>
                      {item.attributes.pattern.data != null && (
                        <div>
                          <strong>Kiểu mẫu: </strong> {item.attributes.pattern.data.attributes.name}
                        </div>
                      )}
                      {item.attributes.width.data != null && (
                        <div>
                          <strong>Chiều rộng: </strong> {item.attributes.width.data.attributes.name}
                        </div>
                      )}
                      {item.attributes.stretch.data != null && (
                        <div>
                          <strong>Co giãn: </strong> {item.attributes.stretch.data.attributes.name}
                        </div>
                      )}
                      {item.attributes.origin.data != null && (
                        <div>
                          <strong>Xuất xứ: </strong> {item.attributes.origin.data.attributes.name}
                        </div>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem
                            href={`/products/view?id=${item.attributes.product.data.id}`}
                          >
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem
                            href={`/products/edit?id=${item.attributes.product.data.id}`}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faTrash} /> Xóa
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
