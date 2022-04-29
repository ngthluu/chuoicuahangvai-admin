import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDropdownItem,
  CButton,
  CBadge,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Lịch làm việc</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Cửa hàng</CFormLabel>
                      <CFormSelect options={['Chọn cửa hàng']}></CFormSelect>
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
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
