import React, { useState } from 'react'
import { CFormCheck } from '@coreui/react'
import PropTypes from 'prop-types'

const attributesName = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
const weekDays = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật']

const ShiftComponent = (props) => {
  const handleChangeMorning = (index, value) => {
    let data = { ...props.data }
    data[attributesName[index]].morning = value
    props.setData(data)
  }

  const handleChangeAfternoon = (index, value) => {
    let data = { ...props.data }
    data[attributesName[index]].afternoon = value
    props.setData(data)
  }

  const handleChangeNight = (index, value) => {
    let data = { ...props.data }
    data[attributesName[index]].night = value
    props.setData(data)
  }

  return (
    <>
      {weekDays.map((item, index) => (
        <div className="mb-3" key={index}>
          <strong>{item}</strong>
          <div>
            <CFormCheck
              onChange={(e) => handleChangeMorning(index, e.target.checked)}
              type="checkbox"
              inline
              label="Ca sáng"
              checked={
                props.data[attributesName[index]]
                  ? props.data[attributesName[index]].morning
                  : false
              }
            />
            <CFormCheck
              onChange={(e) => handleChangeAfternoon(index, e.target.checked)}
              type="checkbox"
              inline
              label="Ca chiều"
              checked={
                props.data[attributesName[index]]
                  ? props.data[attributesName[index]].afternoon
                  : false
              }
            />
            <CFormCheck
              onChange={(e) => handleChangeNight(index, e.target.checked)}
              type="checkbox"
              inline
              label="Ca tối"
              checked={
                props.data[attributesName[index]] ? props.data[attributesName[index]].night : false
              }
            />
          </div>
        </div>
      ))}
    </>
  )
}
ShiftComponent.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
}

export default ShiftComponent
