import React from 'react'
import { CBadge } from '@coreui/react'

import PropTypes from 'prop-types'

const StatusLabel = (props) => {
  if (!props.status) {
    return <CBadge color="danger">Tạm khóa</CBadge>
  }
  return <CBadge color="success">Đang hoạt động</CBadge>
}
StatusLabel.propTypes = { status: PropTypes.bool }

export default StatusLabel
