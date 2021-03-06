import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPrint, faTimes, faSave, faCheck } from '@fortawesome/free-solid-svg-icons'

import Modal from 'src/views/template/Modal'
import { useCookies } from 'react-cookie'
import { checkPermission } from 'src/lib/permission'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PropTypes from 'prop-types'

const ActionButtons = (props) => {
  // Permission stuffs
  const moduleName = 'order'
  const [cookies, setCookies] = useCookies([])
  const [permissionCreateExport, setPermissionCreateExport] = useState(false)
  const [permissionCreateInvoice, setPermissionCreateInvoice] = useState(false)
  const [permissionCheckSuccess, setPermissionCheckSuccess] = useState(false)
  const [permissionExportPdfInvoice, setPermissionExportPdfInvoice] = useState(false)
  const [permissionCancel, setPermissionCancel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionCreateExport(await checkPermission(cookies, moduleName, 'create_export'))
    setPermissionCreateInvoice(await checkPermission(cookies, moduleName, 'create_invoice'))
    setPermissionCheckSuccess(await checkPermission(cookies, moduleName, 'check_success'))
    setPermissionExportPdfInvoice(await checkPermission(cookies, moduleName, 'export_pdf_invoice'))
    setPermissionCancel(await checkPermission(cookies, moduleName, 'cancel'))
  }
  // End permission stuffs

  useEffect(() => {
    fetchPermissionData()
  }, [])

  const [createExportModalTargetId, setCreateExportModalTargetId] = useState('')
  const [createExportModalTargetName, setCreateExportModalTargetName] = useState('')
  const [createExportModalVisible, setCreateExportModalVisible] = useState(false)
  const handleClickCreateExport = (e) => {
    e.preventDefault()
    setCreateExportModalTargetId(e.currentTarget.getAttribute('data-id'))
    setCreateExportModalTargetName(e.currentTarget.getAttribute('data-name'))
    setCreateExportModalVisible(!createExportModalVisible)
  }

  const [createInvoiceModalTargetId, setCreateInvoiceModalTargetId] = useState('')
  const [createInvoiceModalTargetName, setCreateInvoiceModalTargetName] = useState('')
  const [createInvoiceModalVisible, setCreateInvoiceModalVisible] = useState(false)
  const handleClickCreateInvoice = (e) => {
    e.preventDefault()
    setCreateInvoiceModalTargetId(e.currentTarget.getAttribute('data-id'))
    setCreateInvoiceModalTargetName(e.currentTarget.getAttribute('data-name'))
    setCreateInvoiceModalVisible(!createInvoiceModalVisible)
  }

  const handleClickPrintInvoice = async (id) => {
    const promise = axios
      .get(`${process.env.REACT_APP_STRAPI_URL}/api/order-print-invoice/${id}`, {
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

  const [cancelModalTargetId, setCancelModalTargetId] = useState('')
  const [cancelModalTargetName, setCancelModalTargetName] = useState('')
  const [cancelModalVisible, setCancelModalVisible] = useState(false)
  const handleClickCancel = (e) => {
    e.preventDefault()
    setCancelModalTargetId(e.currentTarget.getAttribute('data-id'))
    setCancelModalTargetName(e.currentTarget.getAttribute('data-name'))
    setCancelModalVisible(!cancelModalVisible)
  }

  const [deliverySuccessModalTargetId, setDeliverySuccessModalTargetId] = useState('')
  const [deliverySuccessModalTargetName, setDeliverySuccessModalTargetName] = useState('')
  const [deliverySuccessModalVisible, setDeliverySuccessModalVisible] = useState(false)
  const handleClickDeliverySuccess = (e) => {
    e.preventDefault()
    setDeliverySuccessModalTargetId(e.currentTarget.getAttribute('data-id'))
    setDeliverySuccessModalTargetName(e.currentTarget.getAttribute('data-name'))
    setDeliverySuccessModalVisible(!deliverySuccessModalVisible)
  }

  return (
    <>
      <ToastContainer />
      <Modal
        visible={createExportModalVisible}
        visibleAction={setCreateExportModalVisible}
        title="T???o phi???u xu???t kho"
        content={`B???n c?? mu???n t???o phi???u xu???t kho cho ????n h??ng ${createExportModalTargetName} kh??ng ?`}
        id={createExportModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/order-create-export`}
        triggerSuccess={() => props.fetchData()}
        triggerError={() => props.fetchData()}
        action="post"
      ></Modal>
      <Modal
        visible={createInvoiceModalVisible}
        visibleAction={setCreateInvoiceModalVisible}
        title="Xu???t h??a ????n"
        content={`B???n c?? mu???n xu???t h??a ????n cho ????n h??ng ${createInvoiceModalTargetName} kh??ng ?`}
        id={createInvoiceModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/order-create-invoice`}
        triggerSuccess={() => props.fetchData()}
        triggerError={() => props.fetchData()}
        action="post"
      ></Modal>
      <Modal
        visible={cancelModalVisible}
        visibleAction={setCancelModalVisible}
        title="H???y ????n h??ng"
        content={`B???n c?? mu???n h???y ????n h??ng ${cancelModalTargetName} kh??ng ?`}
        id={cancelModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/order-cancel`}
        triggerSuccess={() => props.fetchData()}
        triggerError={() => props.fetchData()}
        action="post"
      ></Modal>
      <Modal
        visible={deliverySuccessModalVisible}
        visibleAction={setDeliverySuccessModalVisible}
        title="C???p nh???t tr???ng th??i ????n h??ng"
        content={`B???n c?? mu???n c???p nh???t tr???ng th??i giao h??ng th??nh c??ng cho ????n h??ng ${deliverySuccessModalTargetName} kh??ng ?`}
        id={deliverySuccessModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/order-delivery-success`}
        triggerSuccess={() => props.fetchData()}
        triggerError={() => props.fetchData()}
        action="post"
      ></Modal>
      <CDropdown>
        <CDropdownToggle color="danger" className="text-white">
          H??nh ?????ng
        </CDropdownToggle>
        <CDropdownMenu>
          {permissionCreateExport && props.status === 'initialize' ? (
            <CDropdownItem
              href="#"
              onClick={handleClickCreateExport}
              data-id={props.id}
              data-name={`${props.code}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> T???o phi???u xu???t kho
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
          {permissionCreateInvoice && ['packaged'].includes(props.status) ? (
            <CDropdownItem
              href="#"
              onClick={handleClickCreateInvoice}
              data-id={props.id}
              data-name={`${props.code}`}
            >
              <FontAwesomeIcon icon={faSave} /> Xu???t h??a ????n
            </CDropdownItem>
          ) : (
            <></>
          )}
          {permissionCheckSuccess && ['delivery'].includes(props.status) ? (
            <CDropdownItem
              href="#"
              onClick={handleClickDeliverySuccess}
              data-id={props.id}
              data-name={`${props.code}`}
            >
              <FontAwesomeIcon icon={faCheck} /> Giao h??ng th??nh c??ng
            </CDropdownItem>
          ) : (
            <></>
          )}
          {permissionCancel && ['initialize', 'confirmed'].includes(props.status) ? (
            <CDropdownItem
              href="#"
              onClick={handleClickCancel}
              data-id={props.id}
              data-name={`${props.code}`}
            >
              <FontAwesomeIcon icon={faTimes} /> H???y ????n h??ng
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
