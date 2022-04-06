import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CFormSelect, CFormFeedback } from '@coreui/react'

import PropTypes from 'prop-types'

const SelectFetchData = (props) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await axios.get(props.url)
    const data = props.processFetchDataResponse(response)
    setData(data)
  }

  const handleChange = (e) => {
    e.preventDefault()
    let element = document.getElementsByName(props.name)[0]
    const value = element.options[element.selectedIndex].value
    props.setValue(value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <CFormSelect name={props.name} onChange={handleChange} required value={props.value}>
        <option disabled>Chọn giá trị</option>
        <option value="">Không có</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </CFormSelect>
      <CFormFeedback invalid>Vui lòng chọn giá trị!</CFormFeedback>
    </>
  )
}

SelectFetchData.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  url: PropTypes.string,
  setValue: PropTypes.func,
  processFetchDataResponse: PropTypes.func,
}

export default SelectFetchData
