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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SmartPagination from 'src/views/template/SmartPagination'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [stretchList, setStretchList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      name: { $containsi: filterKeySearch },
    }
    if (filterKeySearch === '') delete filters.name
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  // Permission stuffs
  const moduleName = 'productStretch'
  const [cookies, setCookies] = useCookies([])
  const [permissionAdd, setPermissionAdd] = useState(false)
  const [permissionEdit, setPermissionEdit] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionAdd(await checkPermission(cookies, moduleName, 'add'))
    setPermissionEdit(await checkPermission(cookies, moduleName, 'edit'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        filters: buildFilters(),
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/product-stretches?${query}`,
    )
    setStretchList(response.data.data)
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

  return (
    <CRow>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa co giãn"
        content={`Bạn có muốn xóa co giãn ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Co giãn</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                        type="text"
                        placeholder="Tìm kiếm theo từ khóa..."
                      />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              {permissionAdd ? (
                <Link to="/product-stretch/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>Co giãn</strong>
                  </CButton>
                </Link>
              ) : (
                <></>
              )}
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
                  <CTableHeaderCell scope="col"> Tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {stretchList.length > 0 ? (
                  stretchList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell> {item.attributes.name} </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            Hành động
                          </CDropdownToggle>
                          <CDropdownMenu>
                            {permissionEdit ? (
                              <CDropdownItem href={`/product-stretch/edit?id=${item.id}`}>
                                <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
                            {permissionDelete ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={item.attributes.name}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
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
