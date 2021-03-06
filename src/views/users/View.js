import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CCardFooter,
  CButton,
  CFormFeedback,
} from '@coreui/react'

import ShiftComponent from 'src/views/users/ShiftComponent'
import SelectFetchData from 'src/views/template/SelectFetchData'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const View = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [branchName, setBranchName] = useState('')
  const [shift, setShift] = useState({
    monday: { morning: false, afternoon: false, night: false },
    tuesday: { morning: false, afternoon: false, night: false },
    wednesday: { morning: false, afternoon: false, night: false },
    thursday: { morning: false, afternoon: false, night: false },
    friday: { morning: false, afternoon: false, night: false },
    saturday: { morning: false, afternoon: false, night: false },
    sunday: { morning: false, afternoon: false, night: false },
  })

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'name',
          'role',
          'shift',
          'shift.monday',
          'shift.tuesday',
          'shift.wednesday',
          'shift.thursday',
          'shift.friday',
          'shift.saturday',
          'shift.sunday',
          'branch',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/user/${id}?${query}`)
    const data = response.data.data
    if (data.name) {
      setName(data.name.id)
      setFirstName(data.name.firstname)
      setLastName(data.name.lastname)
    }
    setEmail(data.email)
    setPhone(data.phone)
    setRole(data.role.id)
    setBranchName(data.branch ? data.branch.name : '')
    if (data.shift) {
      setShift(data.shift)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CRow>
      <ToastContainer />
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Th??ng tin nh??n vi??n</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>H???</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="H???"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>T??n</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="T??n"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Nh???p email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>S??? ??i???n tho???i</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Nh???p s??? ??i???n tho???i"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Ch???c v???</CFormLabel>
                <SelectFetchData
                  name="role"
                  url={`${process.env.REACT_APP_STRAPI_URL}/api/users-permissions/roles`}
                  value={role}
                  setValue={setRole}
                  processFetchDataResponse={(response) => {
                    return response.data.roles.map((item) => {
                      return { id: item.id, name: item.name }
                    })
                  }}
                ></SelectFetchData>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>C???a h??ng</CFormLabel>
                <CFormInput type="text" placeholder="C???a h??ng" value={branchName} required />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton href="/users" color="secondary" type="button" className="text-white ml-3">
              <strong>H???y b???</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol md={5}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Ca tr???c</h5>
          </CCardHeader>
          <CCardBody>
            <ShiftComponent data={shift} setData={setShift} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default View
