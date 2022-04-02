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

import Modal from 'src/views/template/Modal'
import ProductDescription from 'src/views/products/ProductDescription'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [productsList, setProductsList] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchData = async () => {
    const query = qs.stringify(
      {
        populate: ['product', 'pattern', 'stretch', 'width', 'origin', 'images'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/product-skus?${query}`,
    )
    setProductsList(response.data.data)
    setTotalItems(response.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const [deleteModalTargetId, setDeleteModalTargetId] = useState('')
  const [deleteModalTargetName, setDeleteModalTargetName] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const handleClickDelete = (e) => {
    e.preventDefault()
    setDeleteModalTargetId(e.currentTarget.getAttribute('data-id'))
    setDeleteModalTargetName(e.currentTarget.getAttribute('data-name'))
    setDeleteModalVisible(!deleteModalVisible)
  }
  const handleDeleteSuccess = () => {
    fetchData()
    toast.success('Bạn đã xóa sản phẩm thành công')
  }
  const handleDeleteError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  return (
    <CRow>
      <ToastContainer />
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa sản phẩm"
        content={`Bạn có muốn xóa sản phẩm ${deleteModalTargetName} và các SKU đi kèm không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/products`}
        triggerSuccess={handleDeleteSuccess}
        triggerError={handleDeleteError}
        action="delete"
      ></Modal>
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
            <CTable align="middle" bordered>
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
                {productsList.length > 0 ? (
                  productsList.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <CImage
                          src={`${process.env.REACT_APP_STRAPI_URL}${
                            item.attributes.images.data
                              ? item.attributes.images.data[0].attributes.url
                              : ''
                          }`}
                          width="200"
                        ></CImage>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.product.data
                          ? item.attributes.product.data.attributes.name
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell> {item.attributes.sku} </CTableDataCell>
                      <CTableDataCell> {item.attributes.price} </CTableDataCell>
                      <CTableDataCell align="left">
                        <ProductDescription attributes={item.attributes}></ProductDescription>
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
                            <CDropdownItem
                              href="#"
                              onClick={handleClickDelete}
                              data-id={item.attributes.product.data.id}
                              data-name={item.attributes.product.data.attributes.name}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Xóa
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
