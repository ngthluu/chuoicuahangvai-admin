import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { CDropdownItem } from '@coreui/react'

import PropTypes from 'prop-types'

const StatusAction = (props) => {
  if (!props.status) {
    return (
      <CDropdownItem href="#">
        <FontAwesomeIcon icon={faCheck} /> Nhập vào kho
      </CDropdownItem>
    )
  }
  return <></>
}
StatusAction.propTypes = { status: PropTypes.bool }

export default StatusAction
