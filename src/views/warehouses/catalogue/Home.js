import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  faCheck,
  faTrash,
  faPlus,
  faFilePdf,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'

const Home = () => {
  const [catalogueList, setCatalogueList] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchData = async () => {
    const result = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues`, {
      params: {
        populate: ['branch', 'submit_user'],
        pagination: {
          page: page,
        },
      },
    })
    setCatalogueList(result.data.data)
    setTotalItems(result.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Delete logic
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
    toast.success('Bạn đã xóa phiếu kiểm kho thành công')
  }
  const handleDeleteError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  // Submit logic
  const [submitModalTargetId, setSubmitModalTargetId] = useState('')
  const [submitModalTargetName, setSubmitModalTargetName] = useState('')
  const [submitModalVisible, setSubmitModalVisible] = useState(false)
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setSubmitModalTargetId(e.currentTarget.getAttribute('data-id'))
    setSubmitModalTargetName(e.currentTarget.getAttribute('data-name'))
    setSubmitModalVisible(!deleteModalVisible)
  }
  const handleSubmitSuccess = () => {
    fetchData()
    toast.success('Bạn đã kiểm kho thành công')
  }
  const handleSubmitError = () => {
    fetchData()
    toast.error('Thao tác thất bại. Có lỗi xảy ra !!')
  }

  return (
    <CRow>
      <ToastContainer />
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa phiếu kiểm kho"
        content={`Bạn có muốn xóa phiếu kiểm kho ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues`}
        triggerSuccess={handleDeleteSuccess}
        triggerError={handleDeleteError}
        action="delete"
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Kiểm kho"
        content={`Bạn có muốn kiểm kho với phiếu ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues/submit`}
        triggerSuccess={handleSubmitSuccess}
        triggerError={handleSubmitError}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý phiếu kiểm kho</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Kho</CFormLabel>
                      <CFormSelect options={['Chọn kho']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày kiểm kho (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày kiểm kho (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày kiểm kho (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày kiểm kho (đến)" />
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
              <Link to="/warehouses/catalogue/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Phiếu kiểm kho</strong>
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
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cửa hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày kiểm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên kiểm </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {catalogueList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/warehouses/catalogue/view?id=${item.id}`}>
                        CATALOGUE#{item.id}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.attributes.branch.data.attributes.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.attributes.submit_time} </CTableDataCell>
                    <CTableDataCell>
                      {item.attributes.submit_user.data
                        ? item.attributes.submit_user.data.attributes.username
                        : ''}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.attributes.submit_status ? (
                        <CBadge color="success">Đã kiểm kho</CBadge>
                      ) : (
                        <CBadge color="danger">Chưa kiểm kho</CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/warehouses/catalogue/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faFilePdf} /> Xuất PDF
                          </CDropdownItem>
                          {item.attributes.submit_status ? (
                            <></>
                          ) : (
                            <>
                              <CDropdownItem href={`/warehouses/catalogue/edit?id=${item.id}`}>
                                <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                              </CDropdownItem>
                              <CDropdownItem
                                href="#"
                                onClick={handleClickSubmit}
                                data-id={item.id}
                                data-name={`CATALOGUE#${item.id}`}
                              >
                                <FontAwesomeIcon icon={faCheck} /> Kiểm kho
                              </CDropdownItem>
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={`CATALOGUE#${item.id}`}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                              </CDropdownItem>
                            </>
                          )}
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
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
