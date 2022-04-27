import React, { useState } from 'react'
import { CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormFeedback } from '@coreui/react'

import PropTypes from 'prop-types'

const ApplyForTypeNewCustomer = (props) => {
  return <></>
}
ApplyForTypeNewCustomer.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
}

const ApplyForTypeAllCustomersLimitQuantity = (props) => {
  const handleChange = (e) => {
    props.setData(
      JSON.stringify({
        quantity: e.target.value,
      }),
    )
  }
  return (
    <>
      <CCol md={12} className="mb-3">
        <CFormLabel>Số lượng giới hạn</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Số lượng giới hạn"
          value={JSON.parse(props.data).quantity}
          onChange={handleChange}
        />
      </CCol>
    </>
  )
}
ApplyForTypeAllCustomersLimitQuantity.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
}

const AddApplyFor = (props) => {
  const getApplyForText = (value) => {
    switch (value) {
      case 'new_customers':
        return `Khách hàng mới (đăng kí 1 tháng)`
      case 'all_customers_limit_quantity':
        return `Tất cả khách hàng, giới hạn vouchers`
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
          <CFormLabel>Áp dụng cho</CFormLabel>
          <CFormSelect onChange={handleChange} value={props.data}>
            <option value="">Không có</option>
            <option value="new_customers">{getApplyForText('new_customers')}</option>
            <option value="all_customers_limit_quantity">
              {getApplyForText('all_customers_limit_quantity')}
            </option>
          </CFormSelect>
          <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
        </CCol>
      </CRow>
      <CRow>
        {props.data === 'new_customers' ? (
          <ApplyForTypeNewCustomer
            data={props.valueData}
            setData={props.setValueData}
          ></ApplyForTypeNewCustomer>
        ) : props.data === 'all_customers_limit_quantity' ? (
          <ApplyForTypeAllCustomersLimitQuantity
            data={props.valueData}
            setData={props.setValueData}
          ></ApplyForTypeAllCustomersLimitQuantity>
        ) : (
          <></>
        )}
      </CRow>
    </>
  )
}

AddApplyFor.propTypes = {
  data: PropTypes.string,
  setData: PropTypes.func,
  valueData: PropTypes.string,
  setValueData: PropTypes.func,
}

export default AddApplyFor
