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

import SelectFetchData from 'src/views/template/SelectFetchData'
import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [productsList, setProductsList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterColor, setFilterColor] = useState('')
  const [filterPattern, setFilterPattern] = useState('')
  const [filterWidth, setFilterWidth] = useState('')
  const [filterStretch, setFilterStretch] = useState('')
  const [filterOrigin, setFilterOrigin] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [
        { sku: { $containsi: filterKeySearch } },
        { product: { name: { $containsi: filterKeySearch } } },
      ],
      color: { id: { $eq: filterColor } },
      pattern: { id: { $eq: filterPattern } },
      stretch: { id: { $eq: filterWidth } },
      width: { id: { $eq: filterStretch } },
      origin: { id: { $eq: filterOrigin } },
    }
    if (filterColor === '') delete filters.color
    if (filterPattern === '') delete filters.pattern
    if (filterWidth === '') delete filters.stretch
    if (filterStretch === '') delete filters.width
    if (filterOrigin === '') delete filters.origin
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const query = qs.stringify(
      {
        filters: buildFilters(),
        populate: ['product', 'color', 'pattern', 'stretch', 'width', 'origin', 'images'],
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
  }, [page, filterColor, filterPattern, filterWidth, filterStretch, filterOrigin])

  const [deleteModalTargetId, setDeleteModalTargetId] = useState('')
  const [deleteModalTargetName, setDeleteModalTargetName] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const handleClickDelete = (e) => {
    e.preventDefault()
    setDeleteModalTargetId(e.currentTarget.getAttribute('data-id'))
    setDeleteModalTargetName(e.currentTarget.getAttribute('data-name'))
    setDeleteModalVisible(!deleteModalVisible)
  }

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa sản phẩm"
        content={`Bạn có muốn xóa sản phẩm ${deleteModalTargetName} và các SKU đi kèm không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/products`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý sản phẩm</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Tìm kiếm theo từ khóa..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Màu sắc</CFormLabel>
                      <SelectFetchData
                        name="color"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-colors`}
                        value={filterColor}
                        setValue={setFilterColor}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Kiểu mẫu</CFormLabel>
                      <SelectFetchData
                        name="pattern"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-patterns`}
                        value={filterPattern}
                        setValue={setFilterPattern}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Chiều rộng</CFormLabel>
                      <SelectFetchData
                        name="width"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-widths`}
                        value={filterWidth}
                        setValue={setFilterWidth}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Co giãn</CFormLabel>
                      <SelectFetchData
                        name="stretch"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
                        value={filterStretch}
                        setValue={setFilterStretch}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Xuất xứ</CFormLabel>
                      <SelectFetchData
                        name="origin"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-origins`}
                        value={filterOrigin}
                        setValue={setFilterOrigin}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
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
            <CTable align="middle" bordered responsive>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hình ảnh </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> SKU </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Giá (đ) </CTableHeaderCell>
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
                      <CTableDataCell>
                        {parseInt(item.attributes.price).toLocaleString()}
                      </CTableDataCell>
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
