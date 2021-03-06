import React, { useState, useEffect } from 'react'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

import Modal from 'src/views/template/Modal'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

const ActionButtons = (props) => {
  // Permission stuffs
  const moduleName = 'warehouseImport'
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
        title="X??a phi???u nh???p kho"
        content={`B???n c?? mu???n x??a phi???u nh???p kho ${deleteModalTargetName} kh??ng ?`}
        id={deleteModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports`}
        triggerSuccess={() => history.push('/warehouses/import')}
        triggerError={() => {}}
        action="delete"
        isHideToastAfterSuccess={true}
      ></Modal>
      <Modal
        visible={submitModalVisible}
        visibleAction={setSubmitModalVisible}
        title="Nh???p kho"
        content={`B???n c?? mu???n nh???p kho v???i phi???u ${submitModalTargetName} kh??ng ? (l??u ??: ph???i l??u th??ng tin ????n nh???p kho tr?????c)`}
        id={submitModalTargetId}
        url={`${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports/submit`}
        triggerSuccess={() => history.push(`/warehouses/import/view?id=${props.id}`)}
        triggerError={() => {}}
        action="post"
        isHideToastAfterSuccess={true}
      ></Modal>
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
              data-name={`IMPORT#${props.id}`}
            >
              <FontAwesomeIcon icon={faCheck} /> Nh???p v??o kho
            </CDropdownItem>
          ) : (
            <></>
          )}
          {permissionDelete ? (
            <CDropdownItem
              href="#"
              onClick={handleClickDelete}
              data-id={props.id}
              data-name={`IMPORT#${props.id}`}
            >
              <FontAwesomeIcon icon={faTrash} /> X??a
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
