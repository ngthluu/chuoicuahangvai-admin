import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCol,
  CCardHeader,
  CButton,
  CCardBody,
  CFormLabel,
  CRow,
  CFormInput,
  CFormFeedback,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import InputDropdownSearch from 'src/views/template/InputDropdownSearch'

import ProductDescription from 'src/views/products/ProductDescription'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PropTypes from 'prop-types'

const HomepageCustomerResponse = (props) => {
  const [data, setData] = useState([])

  const handleAddSKU = (skuItem) => {
    const productSkuId = skuItem.id
    if (productSkuId === '') return
    if (props.data.filter((item) => item.id === productSkuId).length > 0) return

    const productSku = skuItem.attributes.sku
    const productName = skuItem.attributes.product.data.attributes.name
    const productAttributes = skuItem.attributes

    let newProducts = [...props.data]
    newProducts.push({
      componentId: null,
      id: productSkuId,
      sku: productSku,
      name: productName,
      attributes: productAttributes,
    })
    props.setData(newProducts)
  }

  const handleDelete = (index) => {
    let newProducts = [...props.data]
    newProducts.splice(index, 1)
    props.setData(newProducts)
    setData([])
  }

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div>
      <ToastContainer />
      <CRow className="mb-3">
        <InputDropdownSearch
          placeholder="Tìm kiếm sản phẩm"
          ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/product-skus`}
          ajaxDataPopulate={['product', 'color', 'pattern', 'stretch', 'width', 'origin', 'images']}
          ajaxDataGetFilters={(value) => {
            return {
              $or: [{ sku: { $containsi: value } }, { product: { name: { $containsi: value } } }],
            }
          }}
          ajaxDataGetItemName={(item) =>
            `${item.attributes.product.data.attributes.name} (${item.attributes.sku})`
          }
          handleNotFound={() => toast.error('Không tìm thấy sản phẩm này !!!')}
          handleFound={(item) => handleAddSKU(item)}
        />
      </CRow>
      <CRow className="mb-3">
        <CCol md={12}>
          <CTable align="middle" bordered>
            <CTableHead align="middle" color="info">
              <CTableRow>
                <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Mã SP </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Tên SP </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Mô tả </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <FontAwesomeIcon icon={faTrash} />
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody align="middle">
              {data.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell> {index + 1} </CTableDataCell>
                  <CTableDataCell>
                    <Link to="#">{item.sku}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{item.name} </CTableDataCell>
                  <CTableDataCell>
                    <ProductDescription attributes={item.attributes}></ProductDescription>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      className="text-white"
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </div>
  )
}

HomepageCustomerResponse.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
}

export default HomepageCustomerResponse
