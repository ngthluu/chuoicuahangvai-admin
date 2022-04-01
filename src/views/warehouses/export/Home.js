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

const Home = () => {
  const [exportsList, setExportsList] = useState([])

  const fetchData = async () => {
    const result = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports`, {
      params: {
        populate: ['branch', 'submit_user'],
      },
    })
    setExportsList(result.data.data)
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
    toast.success('Bạn đã xóa phiếu xuất kho thành công')
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
    toast.success('Bạn đã xuất kho thành công')
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
        title="Xóa phiếu xuất kho"
        content={`Bạn có muốn xóa phiếu xuất kho ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports`}
        triggerSuccess={handleDeleteSuccess}
        triggerError={handleDeleteError}
        action="delete"
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Xuất kho"
        content={`Bạn có muốn xuất kho với phiếu ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports/submit`}
        triggerSuccess={handleSubmitSuccess}
        triggerError={handleSubmitError}
        action="post"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý phiếu xuất kho</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Kho</CFormLabel>
                      <CFormSelect options={['Chọn kho']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày xuất kho (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày xuất kho (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày xuất kho (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày xuất kho (đến)" />
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
              <Link to="/warehouses/export/add">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faPlus} /> <strong>Phiếu xuất kho</strong>
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
                  <CTableHeaderCell scope="col"> Ngày xuất </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên xuất </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {exportsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/warehouses/export/view?id=${item.id}`}>EXPORT#{item.id}</Link>
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
                        <CBadge color="success">Đã xuất khỏi kho</CBadge>
                      ) : (
                        <CBadge color="danger">Chưa xuất khỏi kho</CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="info" variant="outline">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={`/warehouses/export/view?id=${item.id}`}>
                            <FontAwesomeIcon icon={faEye} /> Xem
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faFilePdf} /> Xuất PDF
                          </CDropdownItem>
                          {item.attributes.submit_status ? (
                            <></>
                          ) : (
                            <>
                              <CDropdownItem href={`/warehouses/export/edit?id=${item.id}`}>
                                <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                              </CDropdownItem>
                              <CDropdownItem
                                href="#"
                                onClick={handleClickSubmit}
                                data-id={item.id}
                                data-name={`EXPORT#${item.id}`}
                              >
                                <FontAwesomeIcon icon={faCheck} /> Xuất khỏi kho
                              </CDropdownItem>
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={`EXPORT#${item.id}`}
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
