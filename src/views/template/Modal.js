import React from 'react'
import axios from 'axios'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

import PropTypes from 'prop-types'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Modal = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    props.visibleAction(false)
    const url = `${props.url}/${props.id}`
    let promise = new Promise((resolve) => setTimeout(resolve, 1000))
    if (props.action === 'delete') {
      promise = axios
        .delete(url)
        .then((response) => {
          if (props.isHideToastAfterSuccess) toast.dismiss()
          props.triggerSuccess()
        })
        .catch((error) => props.triggerError())
    } else if (props.action === 'post') {
      promise = axios
        .post(url)
        .then((response) => {
          if (props.isHideToastAfterSuccess) toast.dismiss()
          props.triggerSuccess()
        })
        .catch((error) => props.triggerError())
    }

    toast.promise(promise, {
      pending: 'Đang thực thi tác vụ, vui lòng chờ một chút...',
      success: 'Tác vụ thành công',
      error: 'Tác vụ thất bại',
    })
  }

  return (
    <>
      <ToastContainer />
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
    </>
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
  action: PropTypes.string,
  isHideToastAfterSuccess: PropTypes.bool,
}

export default Modal
