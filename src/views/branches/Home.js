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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'src/views/template/Modal'

import SmartPagination from 'src/views/template/SmartPagination'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [branchesList, setBranchesList] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // Permission stuffs
  const moduleName = 'branch'
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
        populate: ['address', 'address.address_three_levels', 'manager'],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/branches?${query}`)
    setBranchesList(response.data.data)
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
        title="X??a c???a h??ng"
        content={`B???n c?? mu???n x??a c???a h??ng ${deleteModalTargetName} kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
        triggerSuccess={() => fetchData()}
        triggerError={() => fetchData()}
        action="delete"
      ></Modal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Qu???n l?? c???a h??ng</h4>
              </div>
              {permissionAdd ? (
                <Link to="/branches/add">
                  <CButton color="info" className="text-white w-100">
                    <FontAwesomeIcon icon={faPlus} /> <strong>C???a h??ng</strong>
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
                  <CTableHeaderCell scope="col"> T??n c???a h??ng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Qu???n l?? </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> ?????a ch??? </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> H??nh ?????ng </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {branchesList.length > 0 ? (
                  branchesList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>{item.attributes.name}</CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.manager.data && (
                          <Link to={`/users/view?id=${item.attributes.manager.data.id}`}>
                            {item.attributes.manager.data.attributes.email}
                          </Link>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.attributes.address && item.attributes.address.address_three_levels && (
                          <div>
                            {item.attributes.address.address}
                            <span>, </span>
                            {item.attributes.address.address_three_levels.data.attributes.ward}
                            <span>, </span>
                            {item.attributes.address.address_three_levels.data.attributes.district}
                            <span>, </span>
                            {item.attributes.address.address_three_levels.data.attributes.city}
                          </div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="info" variant="outline">
                            H??nh ?????ng
                          </CDropdownToggle>
                          <CDropdownMenu>
                            {permissionEdit ? (
                              <CDropdownItem href={`/branches/edit?id=${item.id}`}>
                                <FontAwesomeIcon icon={faEdit} /> Ch???nh s???a
                              </CDropdownItem>
                            ) : (
                              <></>
                            )}
                            <CDropdownItem href={`/warehouses/inventory?branch=${item.id}`}>
                              <FontAwesomeIcon icon={faWarehouse} /> Xem t???n kho
                            </CDropdownItem>
                            {permissionDelete ? (
                              <CDropdownItem
                                href="#"
                                onClick={handleClickDelete}
                                data-id={item.id}
                                data-name={item.attributes.name}
                              >
                                <FontAwesomeIcon icon={faTrash} /> X??a
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
                    <CTableDataCell colSpan={'100%'}>Ch??a c?? d??? li???u</CTableDataCell>
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
