import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
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
import SelectFetchData from 'src/views/template/SelectFetchData'

const Home = () => {
  const [filterBranch, setFilterBranch] = useState('')

  const buildFilters = () => {
    let filters = {
      branch: filterBranch,
    }
    if (filterBranch === '') delete filters.branch
    return filters
  }

  const fetchData = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/user?${query}`)
    console.log(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [filterBranch])

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
                      <SelectFetchData
                        name="branch"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                        value={filterBranch}
                        setValue={setFilterBranch}
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
                </CForm>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
