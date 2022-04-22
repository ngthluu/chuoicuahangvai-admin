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
import { faFilePdf, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

import ProductDescription from 'src/views/products/ProductDescription'

const Home = () => {
  const [activeKey, setActiveKey] = useState(2)
  const [products, setProducts] = useState([])
  const [chartData, setChartData] = useState([])

  const fetchData = async () => {
    const query = qs.stringify(
      {
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
  }, [])
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-block d-md-flex justify-content-between">
              <div className="mb-2">
                <h4 className="mb-3">Sản lượng bán ra</h4>
                <CForm className="g-3">
                  <div className="d-block d-md-flex justify-content-left align-items-end">
                    <div className="p-1">
                      <CFormLabel>Tìm kiếm</CFormLabel>
                      <CFormInput type="text" placeholder="Mã đơn hàng..." />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày đặt (từ)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày đặt (từ)" />
                    </div>
                    <div className="p-1">
                      <CFormLabel>Ngày đặt (đến)</CFormLabel>
                      <CFormInput type="date" placeholder="Ngày đặt (đến)" />
                    </div>
                    <div className="p-1">
                      <CButton type="submit" color="info" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
              <div className="d-block d-md-flex justify-content-between">
                <Link to="#">
                  <CButton color="info" className="text-white w-100 mb-2">
                    <FontAwesomeIcon icon={faFilePdf} /> <strong>Xuất PDF</strong>
                  </CButton>
                </Link>
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
                    Dạng bảng
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    Dạng biểu đồ
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CTable align="middle" style={{ marginTop: 30 }} bordered>
                    <CTableHead align="middle">
                      <CTableRow>
                        <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Chiều dài đã bán </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> Phần trăm </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody align="middle">
                      {Object.entries(products).length > 0 ? (
                        Object.entries(products).map(([key, item]) => (
                          <CTableRow key={key}>
                            <CTableDataCell>
                              <Link to="#">{item.skuItem.attributes.sku}</Link>
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
                          <CTableDataCell colSpan={'100%'}>Chưa có dữ liệu</CTableDataCell>
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
