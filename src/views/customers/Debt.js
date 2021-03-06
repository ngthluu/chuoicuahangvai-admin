import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import StatusLabel from 'src/views/template/StatusLabel'
import StatusAction from 'src/views/template/StatusAction'

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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SmartPagination from 'src/views/template/SmartPagination'
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Debt = () => {
  const [customersList, setCustomersList] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [modalCustomerId, setModalCustomerId] = useState('')
  const [modalCustomerName, setModalCustomerName] = useState('')
  const [modalAmount, setModalAmount] = useState(0)
  const handleOpenModal = (item) => {
    setModalCustomerId(item.id)
    setModalCustomerName(`${item.name.firstname} ${item.name.lastname}`)
    setModalVisible(true)
    setModalAmount(0)
  }
  const handleModalSubmit = () => {
    if (modalCustomerId === '' || modalAmount <= 0) return
    setModalVisible(false)
    axios
      .post(`${process.env.REACT_APP_STRAPI_URL}/api/customer/debt/${modalCustomerId}`, {
        data: {
          amount: modalAmount,
        },
      })
      .then((response) => {
        fetchData()
        toast.success('Bạn đã cập nhật thành công')
      })
      .catch((error) => toast.error('Thao tác thất bại. Có lỗi xảy ra !!'))
  }

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const buildFilters = () => {
    let filters = {
      $or: [
        { email: { $containsi: filterKeySearch } },
        {
          name: {
            firstname: { $containsi: filterKeySearch },
          },
        },
        {
          name: {
            lastname: { $containsi: filterKeySearch },
          },
        },
        { phone: { $containsi: filterKeySearch } },
      ],
    }
    if (filterKeySearch === '') delete filters.$or
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  // Permission stuffs
  const moduleName = 'customerDebt'
  const [cookies, setCookies] = useCookies([])
  const [permissionUpdateDebt, setPermissionUpdateDebt] = useState(false)
  const [permissionExpotExcel, setPermissionExpotExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionUpdateDebt(await checkPermission(cookies, moduleName, 'update_debt'))
    setPermissionExpotExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        sort: ['createdAt:desc'],
        filters: buildFilters(),
        populate: [
          'name',
          'orders',
          'orders.order_invoice',
          'orders.order_invoice.order_payment_invoices',
        ],
        pagination: {
          page: page,
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/customer?${query}`)
    setCustomersList(
      response.data.data.map((item) => {
        return {
          ...item,
          debt_amount: item.orders.reduce((prev, cur) => {
            if (!cur.order_invoice) return prev
            return (
              prev +
              cur.order_invoice.price -
              cur.order_invoice.order_payment_invoices.reduce((prev1, cur1) => {
                return prev1 + parseInt(cur1.amount)
              }, 0)
            )
          }, 0),
        }
      }),
    )
    setTotalItems(0)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/customer-export-debt?${query}`,
      { responseType: 'blob' },
    )
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'report.xlsx')
    link.click()
  }

  return (
    <CRow>
      <ToastContainer />
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Cập nhật số tiền nợ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={12}>
              <CFormLabel>
                Vui lòng nhập số tiền mà khách hàng <strong>{modalCustomerName}</strong> trả
              </CFormLabel>
              <CFormInput
                placeholder="Nhập số tiền"
                type="number"
                value={modalAmount}
                onChange={(e) => setModalAmount(e.target.value)}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className="text-white" onClick={() => setModalVisible(false)}>
            Đóng
          </CButton>
          <CButton color="info" className="text-white" onClick={handleModalSubmit}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý khách hàng (nợ)</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="MSKH, Họ và tên..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
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
              {permissionExpotExcel ? (
                <Link to="#">
                  <CButton color="info" className="text-white w-100" onClick={handleExportExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> <strong>Xuất Excel</strong>
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
                  <CTableHeaderCell scope="col"> Họ và tên </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số điện thoại </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Số tiền nợ (đ)</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {customersList.length > 0 ? (
                  customersList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell> {index + 1} </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/customers/view?id=${item.id}`}>
                          {item.name.firstname} {item.name.lastname}
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell> {item.phone} </CTableDataCell>
                      <CTableDataCell> {item.debt_amount.toLocaleString()} </CTableDataCell>
                      <CTableDataCell>
                        {item.debt_amount > 0 ? (
                          <CBadge color="danger">Đang nợ</CBadge>
                        ) : (
                          <CBadge color="success">Thanh toán đủ</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.debt_amount > 0 ? (
                          <CDropdown>
                            <CDropdownToggle color="info" variant="outline">
                              Hành động
                            </CDropdownToggle>
                            <CDropdownMenu>
                              {permissionUpdateDebt ? (
                                <CDropdownItem href="#" onClick={() => handleOpenModal(item)}>
                                  <FontAwesomeIcon icon={faEdit} /> Cập nhật số tiền nợ
                                </CDropdownItem>
                              ) : (
                                <></>
                              )}
                            </CDropdownMenu>
                          </CDropdown>
                        ) : (
                          <></>
                        )}
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

export default Debt
