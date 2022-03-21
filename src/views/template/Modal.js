import React from 'react'
import axios from 'axios'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

import PropTypes from 'prop-types'

const Modal = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    props.visibleAction(false)
    const url = `${props.url}/${props.id}`
    await axios
      .delete(url)
      .then((response) => props.triggerSuccess())
      .catch((error) => props.triggerError())
  }

  return (
    <CModal visible={props.visible} onClose={() => props.visibleAction(false)}>
      <CModalHeader onClose={() => props.visibleAction(false)}>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.content}</CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          className="text-white"
          onClick={() => props.visibleAction(false)}
        >
          Đóng
        </CButton>
        <CButton color="info" className="text-white" onClick={handleSubmit}>
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  visibleAction: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  triggerSuccess: PropTypes.func,
  triggerError: PropTypes.func,
}

export default Modal
