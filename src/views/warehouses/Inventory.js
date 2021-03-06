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
  CFormInput,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import SelectFetchData from 'src/views/template/SelectFetchData'
import ProductDescription from 'src/views/products/ProductDescription'
import SmartPagination from 'src/views/template/SmartPagination'

import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'
import InventoryItemUpdateHistory from './InventoryItemUpdateHistory'

const Inventory = () => {
  const query = useLocation().search
  const branchId = new URLSearchParams(query).get('branch')

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterBranch, setFilterBranch] = useState(branchId ? branchId : '')
  const [filterSku, setFilterSku] = useState('')
  const [inventoryItems, setInventoryItems] = useState([])

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // Permission stuffs
  const moduleName = 'warehouseInventory'
  const [cookies, setCookies] = useCookies([])
  const [permissionExportExcel, setPermissionExportExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionExportExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const buildFilters = () => {
    let filters = {
      $or: [{ id: { $containsi: filterKeySearch } }],
      branch: { id: { $eq: filterBranch } },
      sku_quantity: { sku: { id: { $eq: filterSku } } },
    }
    if (filterKeySearch === '') delete filters.$or
    if (filterBranch === '') delete filters.branch
    if (filterSku === '') delete filters.sku_quantity
    return filters
  }
  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        pagination: {
          page: page,
        },
        filters: buildFilters(),
        populate: [
          'sku_quantity',
          'sku_quantity.sku',
          'sku_quantity.sku.product',
          'sku_quantity.sku.color',
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
  }, [page, filterBranch, filterSku])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/warehouse-inventory-export?${query}`,
      { responseType: 'blob' },
    )
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'report.xlsx')
    link.click()
  }

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Qu???n l?? t???n kho</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>T??m ki???m</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="T??m ki???m ID trong kho..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>C???a h??ng</CFormLabel>
                      <SelectFetchData
                        name="branch"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                        value={filterBranch}
                        setValue={setFilterBranch}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>SKU</CFormLabel>
                      <SelectFetchData
                        name="sku"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-skus?populate[]=product`}
                        value={filterSku}
                        setValue={setFilterSku}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return {
                              id: item.id,
                              name: `${item.attributes.product.data.attributes.name} - ${item.attributes.sku}`,
                            }
                          })
                        }}
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
              {permissionExportExcel ? (
                <Link to="#">
                  <CButton color="info" className="text-white w-100" onClick={handleExportExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> <strong>Xu???t Excel</strong>
                  </CButton>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" bordered responsive>
              <CTableHead align="middle">
                <CTableRow>
                  <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> M?? t??? </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Chi???u d??i c??n l???i (cm) </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> L???ch s??? c???p nh???t </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody align="middle">
                {inventoryItems.length > 0 ? (
                  inventoryItems.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>#{item.id}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/products/view?id=${item.attributes.sku_quantity.sku.data.id}`}>
                          {item.attributes.sku_quantity.sku.data.attributes.sku}
                        </Link>
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
                      <CTableDataCell>
                        <InventoryItemUpdateHistory
                          id={item.id}
                          createdDate={item.attributes.createdAt}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={'100%'}>Ch??a c?? d??? li???u</CTableDataCell>
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
