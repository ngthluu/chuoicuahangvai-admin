import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormFeedback } from '@coreui/react'

import PropTypes from 'prop-types'

const Address = (props) => {
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState(0)
  const fetchCitiesData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/cities`)
    let data = []
    response.data.data.forEach((item) => {
      data.push({ label: item, value: item })
    })
    setCities(data)
    setDistricts([])
    setWards([])
  }
  const fetchDistrictsData = async (city) => {
    if (city === '') return
    let data = []
    const query = qs.stringify({ city: city }, { encodeValuesOnly: true })
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/districts?${query}`)
    response.data.data.forEach((item) => {
      data.push({ label: item, value: item })
    })
    setDistricts(data)
    setWards([])
  }
  const fetchWardsData = async (district, city) => {
    if (district === '' || city === '') return
    let data = []
    const query = qs.stringify({ city: city, district: district }, { encodeValuesOnly: true })
    const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/wards?${query}`)
    response.data.data.forEach((item) => {
      data.push({ label: item.label, value: item.value })
    })
    setWards(data)
  }

  const handleChangeCity = (e) => {
    e.preventDefault()
    let city = document.getElementsByName('city')[0]
    city = city.options[city.selectedIndex].value
    setCity(city)
    fetchDistrictsData(city)
  }

  const handleChangeDistrict = (e) => {
    e.preventDefault()
    let city = document.getElementsByName('city')[0]
    city = city.options[city.selectedIndex].value
    let district = document.getElementsByName('district')[0]
    district = district.options[district.selectedIndex].value
    setDistrict(district)
    fetchWardsData(district, city)
  }

  const handleChangeWard = (e) => {
    e.preventDefault()
    let ward = document.getElementsByName('ward')[0]
    ward = ward.options[ward.selectedIndex].value
    setWard(ward)
  }

  useEffect(() => {
    async function fetchData() {
      setCity(props.city)
      setDistrict(props.district)
      setWard(props.ward)
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
          <CFormLabel>T???nh / Th??nh ph??? (*)</CFormLabel>
          <CFormSelect name="city" onChange={handleChangeCity} required value={city}>
            <option disabled>Ch???n t???nh/th??nh ph???</option>
            {cities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui l??ng ch???n t???nh/th??nh ph???!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6} className="mb-3">
          <CFormLabel>Qu???n / Huy???n (*)</CFormLabel>
          <CFormSelect name="district" onChange={handleChangeDistrict} required value={district}>
            <option disabled>Ch???n qu???n/huy???n</option>
            {districts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui l??ng ch???n qu???n/huy???n!</CFormFeedback>
        </CCol>
        <CCol md={6} className="mb-3">
          <CFormLabel>Ph?????ng / X?? (*)</CFormLabel>
          <CFormSelect name="ward" required onChange={handleChangeWard} value={ward}>
            <option disabled>Ch???n ph?????ng/x??</option>
            {wards.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </CFormSelect>
          <CFormFeedback invalid>Vui l??ng ch???n ph?????ng/x??!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={12}>
          <CFormLabel>?????a ch??? (*)</CFormLabel>
          <CFormInput
            name="address"
            type="text"
            placeholder="Nh???p ?????a ch???"
            required
            defaultValue={props.address}
          />
          <CFormFeedback invalid>Vui l??ng nh???p ?????a ch??? !</CFormFeedback>
        </CCol>
      </CRow>
    </>
  )
}

Address.propTypes = {
  city: PropTypes.string,
  district: PropTypes.string,
  ward: PropTypes.number,
  address: PropTypes.string,
}

export default Address
