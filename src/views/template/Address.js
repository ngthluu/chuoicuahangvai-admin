import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormFeedback } from '@coreui/react'

const Address = () => {
  const defaultCityValue = 'Chọn tỉnh/thành phố'
  const defaultDistrictValue = 'Chọn quận/huyện'
  const defaultWardValue = 'Chọn phường/xã'

  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const fetchCitiesData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/cities`)
    let data = [defaultCityValue]
    response.data.data.forEach((item) => {
      data.push({ label: item, value: item })
    })
    setCities(data)
    setDistricts([defaultDistrictValue])
    setWards([defaultWardValue])
  }
  const fetchDistrictsData = async (city) => {
    let data = [defaultDistrictValue]
    if (city !== defaultCityValue) {
      const query = qs.stringify({ city: city }, { encodeValuesOnly: true })
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/districts?${query}`)
      response.data.data.forEach((item) => {
        data.push({ label: item, value: item })
      })
    }
    setDistricts(data)
    setWards([defaultWardValue])
  }
  const fetchWardsData = async (district, city) => {
    let data = [defaultWardValue]
    if (district !== defaultDistrictValue) {
      const query = qs.stringify({ city: city, district: district }, { encodeValuesOnly: true })
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wards?${query}`)
      response.data.data.forEach((item) => {
        data.push({ label: item, value: item })
      })
    }
    setWards(data)
  }

  const handleChangeCity = (e) => {
    e.preventDefault()
    let city = document.getElementsByName('city')[0]
    city = city.options[city.selectedIndex].value
    fetchDistrictsData(city)
  }

  const handleChangeDistrict = (e) => {
    e.preventDefault()
    let city = document.getElementsByName('city')[0]
    city = city.options[city.selectedIndex].value
    let district = document.getElementsByName('district')[0]
    district = district.options[district.selectedIndex].value
    fetchWardsData(district, city)
  }

  useEffect(() => {
    fetchCitiesData()
  }, [])

  return (
    <>
      <CRow className="mb-3">
        <CCol md={12}>
          <CFormLabel>Tỉnh / Thành phố (*)</CFormLabel>
          <CFormSelect
            name="city"
            onChange={handleChangeCity}
            options={cities}
            required
          ></CFormSelect>
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6} className="mb-3">
          <CFormLabel>Quận / Huyện (*)</CFormLabel>
          <CFormSelect
            name="district"
            onChange={handleChangeDistrict}
            options={districts}
            required
          ></CFormSelect>
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
        <CCol md={6} className="mb-3">
          <CFormLabel>Phường / Xã (*)</CFormLabel>
          <CFormSelect name="ward" options={wards} required></CFormSelect>
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={12}>
          <CFormLabel>Địa chỉ</CFormLabel>
          <CFormInput type="text" placeholder="Nhập địa chỉ" required />
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
      </CRow>
    </>
  )
}

export default Address
