import React from 'react'
import { CFormCheck } from '@coreui/react'
import PropTypes from 'prop-types'

const ShiftComponent = (props) => {
  return (
    <div className="mb-3">
      <strong>{props.title}</strong>
      <div>
        <CFormCheck type="checkbox" inline label="Ca sáng" />
        <CFormCheck type="checkbox" inline label="Ca chiều" />
        <CFormCheck type="checkbox" inline label="Ca tối" />
      </div>
    </div>
  )
}
ShiftComponent.propTypes = {
  title: PropTypes.string,
}

export default ShiftComponent
