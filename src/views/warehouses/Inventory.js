import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormLabel,
  CImage,
  CFormSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ImageUpload from 'src/views/template/ImageUpload'

import SelectFetchData from 'src/views/template/SelectFetchData'

const Inventory = () => {
  const query = useLocation().search
  const branchId = new URLSearchParams(query).get('branch')

  const [branch, setBranch] = useState(branchId ? branchId : '')
  const [inventoryItems, setInventoryItems] = useState([])

  const fetchData = async () => {
    const query = qs.stringify(
      {
        filters: {
          branch: { id: { $eq: branch === '' ? -1 : branch } },
        },
        populate: ['sku_quantity', 'sku_quantity.sku', 'sku_quantity.sku.product'],
      },
      { encodeValuesOnly: true },
    )
    const result = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-inventories?${query}`,
    )
    console.log(result.data.data)
    setInventoryItems(result.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [branch])

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Quản lý tồn kho</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Chi nhánh</CFormLabel>
                      <SelectFetchData
                        name="manager"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                        value={branch}
                        setValue={setBranch}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              <Link to="#">
                <CButton color="info" className="text-white w-100">
                  <FontAwesomeIcon icon={faFilePdf} /> <strong>Xuất PDF</strong>
                </CButton>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" bordered>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chiều dài còn lại </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian cập nhật gần nhất </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {inventoryItems.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>
                      <Link to="#">{item.attributes.sku_quantity.sku.data.attributes.sku}</Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {
                        item.attributes.sku_quantity.sku.data.attributes.product.data.attributes
                          .name
                      }
                    </CTableDataCell>
                    <CTableDataCell> {item.quantity} </CTableDataCell>
                    <CTableDataCell> {item.latest_update_time} </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Inventory
