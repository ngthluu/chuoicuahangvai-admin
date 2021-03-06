import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSearch, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons'

import ProductDescription from 'src/views/products/ProductDescription'
import SelectFetchData from 'src/views/template/SelectFetchData'
import { checkPermission } from 'src/lib/permission'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [activeKey, setActiveKey] = useState(2)
  const [products, setProducts] = useState([])

  const [filterKeySearch, setFilterKeySearch] = useState('')
  const [filterColor, setFilterColor] = useState('')
  const [filterPattern, setFilterPattern] = useState('')
  const [filterWidth, setFilterWidth] = useState('')
  const [filterStretch, setFilterStretch] = useState('')
  const [filterOrigin, setFilterOrigin] = useState('')

  const buildFilters = () => {
    let filters = {
      products: {
        inventory_item: {
          sku_quantity: {
            sku: {
              $or: [
                { sku: { $containsi: filterKeySearch } },
                { product: { name: { $containsi: filterKeySearch } } },
              ],
              color: { id: { $eq: filterColor } },
              pattern: { id: { $eq: filterPattern } },
              stretch: { id: { $eq: filterWidth } },
              width: { id: { $eq: filterStretch } },
              origin: { id: { $eq: filterOrigin } },
            },
          },
        },
      },
    }
    if (filterColor === '') delete filters.products.inventory_item.sku_quantity.sku.color
    if (filterPattern === '') delete filters.products.inventory_item.sku_quantity.sku.pattern
    if (filterWidth === '') delete filters.products.inventory_item.sku_quantity.sku.stretch
    if (filterStretch === '') delete filters.products.inventory_item.sku_quantity.sku.width
    if (filterOrigin === '') delete filters.products.inventory_item.sku_quantity.sku.origin
    return filters
  }

  const handleSubmitFilters = (e) => {
    e.preventDefault()
    fetchData()
  }

  // Permission stuffs
  const moduleName = 'statisticsSoldvolume'
  const [cookies, setCookies] = useCookies([])
  const [permissionExportExcel, setPermissionExportExcel] = useState(false)
  const fetchPermissionData = async () => {
    setPermissionExportExcel(await checkPermission(cookies, moduleName, 'export_excel'))
  }
  // End permission stuffs

  const fetchData = async () => {
    await fetchPermissionData()
    const query = qs.stringify(
      {
        filters: buildFilters(),
        populate: [
          'order',
          'customer_name',
          'products',
          'products.inventory_item',
          'products.inventory_item.sku_quantity',
          'products.inventory_item.sku_quantity.sku',
          'products.inventory_item.sku_quantity.sku.product',
          'products.inventory_item.sku_quantity.sku.images',
          'products.inventory_item.sku_quantity.sku.pattern',
          'products.inventory_item.sku_quantity.sku.stretch',
          'products.inventory_item.sku_quantity.sku.width',
          'products.inventory_item.sku_quantity.sku.origin',
          'products.inventory_item.sku_quantity.sku.color',
          'order_payment_invoices',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/order-invoices?${query}`,
    )
    let products = {}
    response.data.data.forEach((itemInvoice) => {
      const invoiceProducts = itemInvoice.attributes.products
      invoiceProducts.forEach((itemProduct) => {
        const length = itemProduct.length
        const inventoryItem = itemProduct.inventory_item.data
        const skuQuantityItem = inventoryItem.attributes.sku_quantity
        const skuItem = skuQuantityItem.sku.data
        if (products.hasOwnProperty(skuItem.id)) {
          products[skuItem.id].length += length
        } else {
          products[skuItem.id] = {
            skuItem: skuItem,
            length: length,
          }
        }
      })
    })
    setProducts(products)
  }

  useEffect(() => {
    fetchData()
  }, [filterColor, filterPattern, filterWidth, filterStretch, filterOrigin])

  const handleExportExcel = async () => {
    const query = qs.stringify({ filters: buildFilters() }, { encodeValuesOnly: true })
    const response = await axios.get(
      `${process.env.REACT_APP_STRAPI_URL}/api/statistics-soldvolume-export?${query}`,
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
                <h4 className="mb-3">S???n l?????ng b??n ra</h4>
                <CForm className="g-3" onSubmit={handleSubmitFilters}>
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>T??m ki???m</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="T??m ki???m theo t??? kh??a..."
                        value={filterKeySearch}
                        onChange={(e) => setFilterKeySearch(e.target.value)}
                      />
                    </div>
                    <div className="p-1">
                      <CFormLabel>M??u s???c</CFormLabel>
                      <SelectFetchData
                        name="color"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-colors`}
                        value={filterColor}
                        setValue={setFilterColor}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ki???u m???u</CFormLabel>
                      <SelectFetchData
                        name="pattern"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-patterns`}
                        value={filterPattern}
                        setValue={setFilterPattern}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
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
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Chi???u r???ng</CFormLabel>
                      <SelectFetchData
                        name="width"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-widths`}
                        value={filterWidth}
                        setValue={setFilterWidth}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Co gi??n</CFormLabel>
                      <SelectFetchData
                        name="stretch"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-stretches`}
                        value={filterStretch}
                        setValue={setFilterStretch}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                    <div className="p-1">
                      <CFormLabel>Xu???t x???</CFormLabel>
                      <SelectFetchData
                        name="origin"
                        url={`${process.env.REACT_APP_STRAPI_URL}/api/product-origins`}
                        value={filterOrigin}
                        setValue={setFilterOrigin}
                        processFetchDataResponse={(response) => {
                          return response.data.data.map((item) => {
                            return { id: item.id, name: item.attributes.name }
                          })
                        }}
                      ></SelectFetchData>
                    </div>
                  </div>
                </CForm>
              </div>
              <div className="d-block d-md-flex justify-content-between">
                {permissionExportExcel ? (
                  <Link to="#">
                    <CButton
                      color="info"
                      className="text-white w-100 mb-2"
                      onClick={handleExportExcel}
                    >
                      <FontAwesomeIcon icon={faFileExcel} /> <strong>Xu???t Excel</strong>
                    </CButton>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <>
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 1} onClick={() => setActiveKey(1)}>
                    D???ng b???ng
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    D???ng bi???u ?????
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CTable align="middle" style={{ marginTop: 30 }} bordered responsive>
                    <CTableHead align="middle">
                      <CTableRow>
                        <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> M?? t??? </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Chi???u d??i ???? b??n </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Ph???n tr??m </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody align="middle">
                      {Object.entries(products).length > 0 ? (
                        Object.entries(products).map(([key, item]) => (
                          <CTableRow key={key}>
                            <CTableDataCell>
                              <Link to={`/products/view?id=${item.skuItem.id}`}>
                                {item.skuItem.attributes.sku}
                              </Link>
                            </CTableDataCell>
                            <CTableDataCell>
                              {item.skuItem.attributes.product.data.attributes.name}
                            </CTableDataCell>
                            <CTableDataCell>
                              <ProductDescription
                                attributes={item.skuItem.attributes}
                              ></ProductDescription>
                            </CTableDataCell>
                            <CTableDataCell>{item.length} </CTableDataCell>
                            <CTableDataCell>
                              {Math.round(
                                (100 * item.length) /
                                  Object.entries(products).reduce(
                                    (prev, [key, item]) => prev + item.length,
                                    0,
                                  ),
                              )}
                              {'%'}
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
                </CTabPane>
                <CTabPane role="tabpanel" visible={activeKey === 2}>
                  <CChart
                    type="doughnut"
                    style={{ width: '400px', margin: 'auto', marginTop: 30 }}
                    data={{
                      labels: Object.entries(products).map(
                        ([key, value]) =>
                          `${value.skuItem.attributes.product.data.attributes.name} - ${value.skuItem.attributes.sku}`,
                      ),
                      datasets: [
                        {
                          backgroundColor: Object.entries(products).map(
                            ([key, value]) =>
                              `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                          ),
                          data: Object.entries(products).map(([key, value]) => value.length),
                        },
                      ],
                    }}
                  />
                </CTabPane>
              </CTabContent>
            </>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Home
