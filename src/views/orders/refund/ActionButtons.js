import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPrint } from '@fortawesome/free-solid-svg-icons'

import Modal from 'src/views/template/Modal'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PropTypes from 'prop-types'

const ActionButtons = (props) => {
  // Permission stuffs
  const moduleName = 'refund'
  const [cookies, setCookies] = useCookies([])
  const [permissionApprove, setPermissionApprove] = useState(false)
  const [permissionExportPdfInvoice, setPermissionExportPdfInvoice] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionApprove(await checkPermission(cookies, moduleName, 'approve'))
    setPermissionExportPdfInvoice(await checkPermission(cookies, moduleName, 'export_pdf_invoice'))
  }
  // End permission stuffs

  useEffect(() => {
    fetchPermissionData()
  }, [])

  // Submit logic
  const [submitModalTargetId, setSubmitModalTargetId] = useState('')
  const [submitModalTargetName, setSubmitModalTargetName] = useState('')
  const [submitModalVisible, setSubmitModalVisible] = useState(false)
  const handleClickSubmit = (e) => {
    e.preventDefault()
    setSubmitModalTargetId(e.currentTarget.getAttribute('data-id'))
    setSubmitModalTargetName(e.currentTarget.getAttribute('data-name'))
    setSubmitModalVisible(!submitModalVisible)
  }

  const handleClickPrintInvoice = async (id) => {
    const promise = axios
      .get(`${process.env.REACT_APP_STRAPI_URL}/api/refund-print-invoice/${id}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'invoice.pdf')
        link.click()
      })
    toast.promise(promise, {
      pending: '??ang th???c thi t??c v???, vui l??ng ch??? m???t ch??t...',
      success: 'T??c v??? th??nh c??ng',
      error: 'T??c v??? th???t b???i',
    })
  }

  return (
    <>
      <ToastContainer />
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Duy???t ????n tr??? h??ng"
        content={`B???n c?? mu???n duy???t ????n tr??? h??ng v?? nh???p kho v???i phi???u ${submitModalTargetName} kh??ng ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/refunds/submit`}
        triggerSuccess={() => props.fetchData()}
        triggerError={() => props.fetchData()}
        action="post"
      ></Modal>
      <CDropdown>
        <CDropdownToggle color="danger" className="text-white">
          H??nh ?????ng
        </CDropdownToggle>
        <CDropdownMenu>
          {permissionApprove && !props.status ? (
            <CDropdownItem
              href="#"
              onClick={handleClickSubmit}
              data-id={props.id}
              data-name={`REFUND#${props.id}`}
            >
              <FontAwesomeIcon icon={faCheck} /> Duy???t v?? nh???p kho
            </CDropdownItem>
          ) : (
            <></>
          )}
          {permissionExportPdfInvoice && props.invoice_id ? (
            <CDropdownItem href="#" onClick={(e) => handleClickPrintInvoice(props.invoice_id)}>
              <FontAwesomeIcon icon={faPrint} /> In h??a ????n
            </CDropdownItem>
          ) : (
            <></>
          )}
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

ActionButtons.propTypes = {
  id: PropTypes.any,
  code: PropTypes.any,
  status: PropTypes.any,
  invoice_id: PropTypes.any,
  fetchData: PropTypes.func,
}

export default ActionButtons
