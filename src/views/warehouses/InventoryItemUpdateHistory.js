import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types'

const InventoryItemUpdateHistory = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [historyItems, setHistoryItems] = useState([])

  const handleViewUpdateHistory = async (e) => {
    e.preventDefault()
    // Export
    const exportQuery = qs.stringify(
      {
        filters: { products: { inventory_item: { id: props.id } }, submit_status: true },
        populate: ['submit_user', 'products', 'products.inventory_item'],
      },
      { encodeValuesOnly: true },
    )
    const exportResult = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-exports?${exportQuery}`,
    )
    // Catalogue
    const catalogueQuery = qs.stringify(
      {
        filters: { products: { inventory_item: { id: props.id } } },
        populate: ['submit_user', 'products', 'products.inventory_item'],
      },
      { encodeValuesOnly: true },
    )
    const catalogueResult = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-catalogues?${catalogueQuery}`,
    )
    let history = [
      {
        type: 'Nhập kho',
        code: '',
        length: '',
        updated_date: props.createdDate,
        updated_user: '',
      },
    ]
    history = [
      ...history,
      ...exportResult.data.data.map((item) => ({
        type: 'Xuất kho',
        code: `EXPORT#${item.id}`,
        length:
          '-' +
          item.attributes.products
            .filter((_) => _.inventory_item.data.id === props.id)
            .reduce((sum, _) => sum + _.length, 0),
        updated_date: item.attributes.submit_time,
        updated_user: item.attributes.submit_user.data.attributes.username,
      })),
    ]
    history = [
      ...history,
      ...catalogueResult.data.data.map((item) => ({
        type: 'Kiểm kho',
        code: `CATALOGUE#${item.id}`,
        length: item.attributes.products
          .filter((_) => _.inventory_item.data.id === props.id)
          .reduce((sum, _) => sum + _.length, 0),
        updated_date: item.attributes.submit_time,
        updated_user: item.attributes.submit_user.data.attributes.username,
      })),
    ].sort((a, b) => a.updated_date < b.updated_date)
    setHistoryItems(history)
    setModalVisible(true)
  }

  return (
    <>
      <CModal size="lg" visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Lịch sử cập nhật</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" bordered responsive>
            <CTableHead align="middle">
              <CTableRow>
                <CTableHeaderCell scope="col"> Loại </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Mã </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Chiều dài (cm) </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Ngày cập nhật </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Người cập nhật </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody align="middle">
              {historyItems.length > 0 ? (
                historyItems.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.type}</CTableDataCell>
                    <CTableDataCell>{item.code}</CTableDataCell>
                    <CTableDataCell>{item.length}</CTableDataCell>
                    <CTableDataCell>{item.updated_date}</CTableDataCell>
                    <CTableDataCell>{item.updated_user}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={'100%'}>Chưa có dữ liệu</CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className="text-white" onClick={() => setModalVisible(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
      <CButton
        type="button"
        color="info"
        className="text-white"
        onClick={(e) => handleViewUpdateHistory(e)}
      >
        <FontAwesomeIcon icon={faHistory} /> Xem lịch sử cập nhật
      </CButton>
    </>
  )
}
InventoryItemUpdateHistory.propTypes = { id: PropTypes.any, createdDate: PropTypes.any }

export default InventoryItemUpdateHistory
