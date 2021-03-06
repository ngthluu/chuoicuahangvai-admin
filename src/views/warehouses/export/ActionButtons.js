import React, { useState, useEffect } from 'react'
import {
  CRow,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import Modal from 'src/views/template/Modal'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

const ActionButtons = (props) => {
  // Permission stuffs
  const moduleName = 'warehouseExport'
  const [permissionSubmit, setPermissionSubmit] = useState(false)
  const [permissionDelete, setPermissionDelete] = useState(false)
  const [cookies, setCookies] = useCookies([])
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
        title="X??a phi???u xu???t kho"
        content={`B???n c?? mu???n x??a phi???u xu???t kho ${deleteModalTargetName} kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports`}
        triggerSuccess={() => history.push('/warehouses/export')}
        triggerError={() => {}}
        action="delete"
        isHideToastAfterSuccess={true}
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Xu???t kho"
        content={`B???n c?? mu???n xu???t kho v???i phi???u ${submitModalTargetName} kh??ng ? (l??u ??: ph???i l??u th??ng tin ????n xu???t kho tr?????c)`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports/submit`}
        triggerSuccess={() => history.push(`/warehouses/export/view?id=${props.id}`)}
        triggerError={() => {}}
        action="post"
        isHideToastAfterSuccess={true}
      ></Modal>

      <CTableDataCell>
        <CDropdown>
          <CDropdownToggle color="danger" className="text-white">
            H??nh ?????ng
          </CDropdownToggle>
          <CDropdownMenu>
            {permissionSubmit ? (
              <CDropdownItem
                href="#"
                onClick={handleClickSubmit}
                data-id={props.id}
                data-name={`EXPORT#${props.id}`}
              >
                <FontAwesomeIcon icon={faCheck} /> Xu???t kh???i kho
              </CDropdownItem>
            ) : (
              <></>
            )}
            {permissionDelete ? (
              <CDropdownItem
                href="#"
                onClick={handleClickDelete}
                data-id={props.id}
                data-name={`EXPORT#${props.id}`}
              >
                <FontAwesomeIcon icon={faTrash} /> X??a
              </CDropdownItem>
            ) : (
              <></>
            )}
          </CDropdownMenu>
        </CDropdown>
      </CTableDataCell>
    </>
  )
}
ActionButtons.propTypes = {
  id: PropTypes.any,
}

export default ActionButtons
