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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const importsList = [
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 1,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 0,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 1,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 1,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 0,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 0,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 0,
  },
  {
    code: '#IMP21091001',
    warehouse: 'Chi nhánh A',
    total_cost: '1.000.000đ',
    import_date: '25/09/2021',
    import_user: 'Nhân viên A',
    status: 1,
  },
]

const Status = (props) => {
  if (props.status === 0) {
    return <CBadge color="danger">Chưa nhập</CBadge>
  }
  return <CBadge color="success">Đã nhập</CBadge>
}
Status.propTypes = { status: PropTypes.number }

const Trash = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý phiếu nhập kho (thùng rác)</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Kho</CFormLabel>
                      <CFormSelect options={['Chọn kho']}></CFormSelect>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày nhập kho (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày nhập kho (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày nhập kho (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày nhập kho (đến)" />
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
                  <CTableHeaderCell scope="col"> ID </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Kho hàng </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tổng giá trị </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Ngày nhập </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Nhân viên nhập </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Trạng thái </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Hành động </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {importsList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/warehouses/import/view?id=${index}`}>{item.code}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.warehouse}</Link>
                    </CTableDataCell>
                    <CTableDataCell> {item.total_cost} </CTableDataCell>
                    <CTableDataCell> {item.import_date} </CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.import_user}</Link>
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
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faUndo} /> Khôi phục
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <FontAwesomeIcon icon={faTrash} /> Xóa vĩnh viễn
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

export default Trash
