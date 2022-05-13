import React, { useState, useEffect } from 'react'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import Modal from 'src/views/template/Modal'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

const ActionButtons = (props) => {
  // Permission stuffs
  const moduleName = 'warehouseCatalogue'
  const [cookies, setCookies] = useCookies([])
  const [permissionSubmit, setPermissionSubmit] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionSubmit(await checkPermission(cookies, moduleName, 'submit'))
    setPermissionDelete(await checkPermission(cookies, moduleName, 'delete'))
  }
  // End permission stuffs

  useEffect(() => {
    fetchPermissionData()
  }, [])

  // Delete logic
  const [deleteModalTargetId, setDeleteModalTargetId] = useState('')
  const [deleteModalTargetName, setDeleteModalTargetName] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const handleClickDelete = (e) => {
    e.preventDefault()
    setDeleteModalTargetId(e.currentTarget.getAttribute('data-id'))
    setDeleteModalTargetName(e.currentTarget.getAttribute('data-name'))
    setDeleteModalVisible(!deleteModalVisible)
  }

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

  const history = useHistory()

  return (
    <>
      <Modal
        visible={deleteModalVisible}
        visibleAction={setDeleteModalVisible}
        title="Xóa phiếu kiểm kho"
        content={`Bạn có muốn xóa phiếu kiểm kho ${deleteModalTargetName} không ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues`}
        triggerSuccess={() => history.push('/warehouses/catalogue')}
        triggerError={() => {}}
        action="delete"
        isHideToastAfterSuccess={true}
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Kiểm kho"
        content={`Bạn có muốn kiểm kho với phiếu ${submitModalTargetName} không ?`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues/submit`}
        triggerSuccess={() => history.push(`/warehouses/catalogue/view?id=${props.id}`)}
        triggerError={() => {}}
        action="post"
        isHideToastAfterSuccess={true}
      ></Modal>
      <CDropdown>
        <CDropdownToggle color="danger" className="text-white">
          Hành động
        </CDropdownToggle>
        <CDropdownMenu>
          {permissionSubmit ? (
            <CDropdownItem
              href="#"
              onClick={handleClickSubmit}
              data-id={props.id}
              data-name={`CATALOGUE#${props.id}`}
            >
              <FontAwesomeIcon icon={faCheck} /> Kiểm kho
            </CDropdownItem>
          ) : (
            <></>
          )}
          {permissionDelete ? (
            <CDropdownItem
              href="#"
              onClick={handleClickDelete}
              data-id={props.id}
              data-name={`CATALOGUE#${props.id}`}
            >
              <FontAwesomeIcon icon={faTrash} /> Xóa
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
}

export default ActionButtons
