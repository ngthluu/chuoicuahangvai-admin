import React from 'react'
import { CBadge } from '@coreui/react'

import PropTypes from 'prop-types'

const StatusLabel = (props) => {
  if (!props.status) {
    return <CBadge color="danger">Chưa nhập vào kho</CBadge>
  }
  return <CBadge color="success">Đã nhập vào kho</CBadge>
}
StatusLabel.propTypes = { status: PropTypes.bool }

export default StatusLabel
