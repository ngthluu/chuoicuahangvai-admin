import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormFeedback } from '@coreui/react'

import PropTypes from 'prop-types'

const Address = (props) => {
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const fetchCitiesData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/cities`)
    let data = []
    response.data.data.forEach((item) => {
      data.push({ label: item, value: item })
    })
    setCities(data)
    setDistricts([])
    setWards([])
  }
  const fetchDistrictsData = async (city) => {
    let data = []
    const query = qs.stringify({ city: city }, { encodeValuesOnly: true })
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/districts?${query}`)
    response.data.data.forEach((item) => {
      data.push({ label: item, value: item })
    })
    setDistricts(data)
    setWards([])
  }
  const fetchWardsData = async (district, city) => {
    let data = []
    const query = qs.stringify({ city: city, district: district }, { encodeValuesOnly: true })
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wards?${query}`)
    response.data.data.forEach((item) => {
      data.push({ label: item.label, value: item.value })
    })
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
    async function fetchData() {
      await fetchCitiesData()
      await fetchDistrictsData(props.city)
      await fetchWardsData(props.district, props.city)
    }
    fetchData()
  }, [props.address])

  return (
    <>
      <CRow className="mb-3">
        <CCol md={12}>
          <CFormLabel>Tỉnh / Thành phố (*)</CFormLabel>
          <CFormSelect name="city" onChange={handleChangeCity} required value={props.city}>
            <option disabled>Chọn tỉnh/thành phố</option>
            {cities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui lòng chọn tỉnh/thành phố!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6} className="mb-3">
          <CFormLabel>Quận / Huyện (*)</CFormLabel>
          <CFormSelect
            name="district"
            onChange={handleChangeDistrict}
            required
            value={props.district}
          >
            <option disabled>Chọn quận/huyện</option>
            {districts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui lòng chọn quận/huyện!</CFormFeedback>
        </CCol>
        <CCol md={6} className="mb-3">
          <CFormLabel>Phường / Xã (*)</CFormLabel>
          <CFormSelect name="ward" required defaultValue={props.ward}>
            <option disabled>Chọn phường/xã</option>
            {wards.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui lòng chọn phường/xã!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={12}>
          <CFormLabel>Địa chỉ (*)</CFormLabel>
          <CFormInput
            name="address"
            type="text"
            placeholder="Nhập địa chỉ"
            required
            defaultValue={props.address}
          />
          <CFormFeedback invalid>Vui lòng nhập địa chỉ !</CFormFeedback>
        </CCol>
      </CRow>
    </>
  )
}

Address.propTypes = {
  city: PropTypes.string,
  district: PropTypes.string,
  ward: PropTypes.string,
  address: PropTypes.string,
}

export default Address
