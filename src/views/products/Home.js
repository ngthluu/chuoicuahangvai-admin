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
  CImage,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faCheck,
  faTrash,
  faPlus,
  faLock,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import sampleImage from 'src/assets/images/vue.jpg'

import PropTypes from 'prop-types'

const productsList = [
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 1,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 1,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 0,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 0,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 1,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 1,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 0,
  },
  {
    code: '#PRO001',
    image: sampleImage,
    name: 'Sản phẩm A',
    color: 'Đỏ',
    pattern: 'Hoa',
    width: '0-5m',
    stretch: '2 hướng',
    source: 'Trung Quốc',
    status: 1,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Bị khóa</CBadge>
  }
  return <CBadge color="success">Hoạt động</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const StatusAction = (props) => {
  if (props.status === 0) {
    return (
      <CDropdownItem href="#">
        <FontAwesomeIcon icon={faCheck} /> Kích hoạt
      </CDropdownItem>
    )
  }
  return (
    <CDropdownItem href="#">
      <FontAwesomeIcon icon={faLock} /> Khóa
    </CDropdownItem>
  )
}
StatusAction.propTypes = { status: PropTypes.number }

const Home = () => {
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
                  <CTableHeaderCell scope="col"> Mã sản phẩm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên sản phẩm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thông tin </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {productsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <CImage src={item.image} width="200"></CImage>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/products/view?id=${index}`}>{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.name} </CTableDataCell>
                    <CTableDataCell align="left">
                      <div>
                        <strong>Màu sắc: </strong> {item.color}
                      </div>
                      <div>
                        <strong>Kiểu mẫu: </strong> {item.pattern}
                      </div>
                      <div>
                        <strong>Chiều rộng: </strong> {item.width}
                      </div>
                      <div>
                        <strong>Co giãn: </strong> {item.stretch}
                      </div>
                      <div>
                        <strong>Xuất xứ: </strong> {item.source}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Status status={item.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/products/view?id=${index}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href={`/products/edit?id=${index}`}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                          </CDropdownItem>
                          <StatusAction status={item.status} />
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
