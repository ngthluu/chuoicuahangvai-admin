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
  CFormSelect,
  CCardFooter,
  CButton,
  CFormFeedback,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import ShiftComponent from 'src/views/users/ShiftComponent'
import ImageUpload from 'src/views/template/ImageUpload'
import SelectFetchData from 'src/views/template/SelectFetchData'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [salary, setSalary] = useState('')
  const [shift, setShift] = useState({
    monday: { morning: false, afternoon: false, night: false },
    tuesday: { morning: false, afternoon: false, night: false },
    wednesday: { morning: false, afternoon: false, night: false },
    thursday: { morning: false, afternoon: false, night: false },
    friday: { morning: false, afternoon: false, night: false },
    saturday: { morning: false, afternoon: false, night: false },
    sunday: { morning: false, afternoon: false, night: false },
  })

  const [validated, setValidated] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      return
    }

    const data = {
      name: { firstname: firstName, lastname: lastName },
      username: email,
      email: email,
      phone: phone,
      role: { id: role },
      shift: shift,
      salary_per_shift: salary,
    }
    if (name !== '') data.name.id = name

    if (id === null) {
      // Add
      axios
        .post(`${process.env.REACT_APP_STRAPI_URL}/api/user`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_STRAPI_URL}/api/user/${id}`, {
          data: data,
        })
        .then((response) => toast.success('Thao tác thành công'))
        .catch((error) => {
          const errorMessage = error.response.data.error.message
          toast.error(`Thao tác thất bại. Có lỗi xảy ra: ${errorMessage}!!`)
        })
    }
  }

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
    setSalary(data.salary_per_shift)
    if (data.shift) {
      setShift(data.shift)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <CCol md={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Thông tin nhân viên</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Họ</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Họ"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Tên</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Tên"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel>Số điện thoại</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel>Chức vụ</CFormLabel>
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Mức lương (theo ca)</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Nhập mức lương"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex">
            <CButton color="info" type="submit" className="text-white">
              <FontAwesomeIcon icon={faSave} /> <strong>Lưu thông tin</strong>
            </CButton>
            <div className="p-2"></div>
            <CButton href="/users" color="secondary" type="button" className="text-white ml-3">
              <strong>Hủy bỏ</strong>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol md={5}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Ca trực</h5>
          </CCardHeader>
          <CCardBody>
            <ShiftComponent data={shift} setData={setShift} />
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
