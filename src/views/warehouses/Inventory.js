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
  CTableFoot,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import SelectFetchData from 'src/views/template/SelectFetchData'
import ProductDescription from 'src/views/products/ProductDescription'
import SmartPagination from 'src/views/template/SmartPagination'

const Inventory = () => {
  const query = useLocation().search
  const branchId = new URLSearchParams(query).get('branch')

  const [branch, setBranch] = useState(branchId ? branchId : '')
  const [inventoryItems, setInventoryItems] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchData = async () => {
    const query = qs.stringify(
      {
        pagination: {
          page: page,
        },
        filters: {
          branch: { id: { $eq: branch === '' ? -1 : branch } },
        },
        populate: [
          'sku_quantity',
          'sku_quantity.sku',
          'sku_quantity.sku.product',
          'sku_quantity.sku.pattern',
          'sku_quantity.sku.stretch',
          'sku_quantity.sku.width',
          'sku_quantity.sku.origin',
        ],
      },
      { encodeValuesOnly: true },
    )
    const result = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-inventories?${query}`,
    )
    setInventoryItems(result.data.data)
    setTotalItems(result.data.meta.pagination.total)
  }

  useEffect(() => {
    fetchData()
  }, [branch, page])

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
                      <CFormLabel>Cửa hàng</CFormLabel>
                      <SelectFetchData
                        name="branch"
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
                  <CTableHeaderCell scope="col"> Chiều dài còn lại (cm) </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Thời gian cập nhật gần nhất </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {inventoryItems.length > 0 ? (
                  inventoryItems.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>#{item.id}</CTableDataCell>
                      <CTableDataCell>
                        <Link to="#">{item.attributes.sku_quantity.sku.data.attributes.sku}</Link>
                      </CTableDataCell>
                      <CTableDataCell>
                        {
                          item.attributes.sku_quantity.sku.data.attributes.product.data.attributes
                            .name
                        }
                      </CTableDataCell>
                      <CTableDataCell>
                        <ProductDescription
                          attributes={item.attributes.sku_quantity.sku.data.attributes}
                        ></ProductDescription>
                      </CTableDataCell>
                      <CTableDataCell> {item.attributes.sku_quantity.length} </CTableDataCell>
                      <CTableDataCell> {item.attributes.updatedAt} </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={'100%'}>Chưa có dữ liệu</CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            <nav className="float-end">
              <SmartPagination
                activePage={page}
                pageSize={25}
                totalItems={totalItems}
                setPage={setPage}
              />
            </nav>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Inventory
