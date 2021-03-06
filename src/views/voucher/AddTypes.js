import React, { useState } from 'react'
import { CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormFeedback } from '@coreui/react'

import PropTypes from 'prop-types'

const TypePercent = (props) => {
  const handleChange = (e) => {
    props.setData(
      JSON.stringify({
        percent: e.target.value,
      }),
    )
  }
  return (
    <CCol md={12} className="mb-3">
      <CFormLabel>Phần trăm (%)</CFormLabel>
      <CFormInput
        type="number"
        placeholder="Phần trăm"
        value={JSON.parse(props.data).percent}
        onChange={handleChange}
      />
    </CCol>
  )
}
TypePercent.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
}

const TypePercentLimit = (props) => {
  const handleChangePercent = (e) => {
    let { percent, limit } = JSON.parse(props.data)
    props.setData(
      JSON.stringify({
        percent: e.target.value,
        limit: limit,
      }),
    )
  }
  const handleChangeLimit = (e) => {
    let { percent, limit } = JSON.parse(props.data)
    props.setData(
      JSON.stringify({
        percent: percent,
        limit: e.target.value,
      }),
    )
  }
  return (
    <>
      <CCol md={12} className="mb-3">
        <CFormLabel>Phần trăm (%)</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Phần trăm"
          value={JSON.parse(props.data).percent}
          onChange={handleChangePercent}
        />
      </CCol>
      <CCol md={12} className="mb-3">
        <CFormLabel>Giới hạn (đ)</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Giới hạn (đ)"
          value={JSON.parse(props.data).limit}
          onChange={handleChangeLimit}
        />
      </CCol>
    </>
  )
}
TypePercentLimit.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
}

const TypeAmount = (props) => {
  const handleChange = (e) => {
    props.setData(
      JSON.stringify({
        value: e.target.value,
      }),
    )
  }
  return (
    <CCol md={12} className="mb-3">
      <CFormLabel>Số tiền giảm (đ)</CFormLabel>
      <CFormInput
        type="number"
        placeholder="Số tiền giảm"
        value={JSON.parse(props.data).value}
        onChange={handleChange}
      />
    </CCol>
  )
}
TypeAmount.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
}

const AddTypes = (props) => {
  const getTypeText = (value) => {
    switch (value) {
      case 'percent':
        return 'Giảm giá tổng đơn hàng (%)'
      case 'percent_limit':
        return 'Giảm giá tổng đơn hàng, có giới hạn số tiền giảm (%)'
      case 'amount':
        return 'Giảm giá tổng đơn hàng (đ)'
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    props.setData(e.target.value)
    props.setValueData('{}')
  }

  return (
    <>
      <CRow>
        <CCol md={12} className="mb-3">
          <CFormLabel>Loại</CFormLabel>
          <CFormSelect onChange={handleChange} value={props.data}>
            <option value="">Không có</option>
            <option value="percent">{getTypeText('percent')}</option>
            <option value="percent_limit">{getTypeText('percent_limit')}</option>
            <option value="amount">{getTypeText('amount')}</option>
          </CFormSelect>
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow>
        {props.data === 'percent' ? (
          <TypePercent data={props.valueData} setData={props.setValueData}></TypePercent>
        ) : props.data === 'percent_limit' ? (
          <TypePercentLimit data={props.valueData} setData={props.setValueData}></TypePercentLimit>
        ) : props.data === 'amount' ? (
          <TypeAmount data={props.valueData} setData={props.setValueData}></TypeAmount>
        ) : (
          <></>
        )}
      </CRow>
    </>
  )
}

AddTypes.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
  valueData: PropTypes.string,
  setValueData: PropTypes.func,
}

export default AddTypes
