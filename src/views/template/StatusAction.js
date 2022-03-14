import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons'

import { CDropdownItem } from '@coreui/react'

import PropTypes from 'prop-types'

const StatusAction = (props) => {
  if (props.status === 0) {
    return (
      <CDropdownItem href="#">
        <FontAwesomeIcon icon={faCheck} /> Kích hoạt
      </CDropdownItem>
    )
  }
  return (
    <CDropdownItem href="#">
      <FontAwesomeIcon icon={faLock} /> Khóa
    </CDropdownItem>
  )
}
StatusAction.propTypes = { status: PropTypes.number }

export default StatusAction
