import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
  CFormLabel,
  CFormInput,
  CCardFooter,
  CButton,
  CFormFeedback,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
} from '@coreui/react'

import { Link } from 'react-router-dom'

import InputDropdownSearch from 'src/views/template/InputDropdownSearch'
import ProductDescription from 'src/views/products/ProductDescription'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [branch, setBranch] = useState('')
  const [branchName, setBranchName] = useState('')
  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')

  const handleAddSKU = (skuItem) => {
    const productSkuId = skuItem.id
    const productSku = skuItem.attributes.sku
    const productName = skuItem.attributes.product.data.attributes.name
    const productAttributes = skuItem.attributes

    let newProducts = [...products]
    newProducts.push({
      componentId: null,
      id: productSkuId,
      sku: productSku,
      name: productName,
      attributes: productAttributes,
      quantity: 1,
      length: 0,
    })
    setProducts(newProducts)
  }

  const handleChangeQuantity = (index, value) => {
    let newProducts = [...products]
    newProducts[index].quantity = parseInt(value)
    setProducts(newProducts)
  }

  const handleChangeLength = (index, value) => {
    let newProducts = [...products]
    newProducts[index].length = parseInt(value)
    setProducts(newProducts)
  }

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        fields: ['id', 'note'],
        populate: {
          branch: { fields: ['id', 'name'] },
          products: {
            fields: ['quantity', 'length'],
            populate: {
              sku: {
                fields: ['sku'],
                populate: ['product', 'color', 'pattern', 'stretch', 'width', 'origin', 'images'],
              },
            },
          },
        },
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/warehouse-imports/${id}?${query}`)
    const data = response.data.data

    setBranch(data.attributes.branch.data.id)
    setBranchName(data.attributes.branch.data.attributes.name)
    setProducts(
      data.attributes.products.map((item) => {
        return {
          componentId: item.id,
          id: item.sku.data.id,
          sku: item.sku.data.attributes.sku,
          name: item.sku.data.attributes.product.data.attributes.name,
          attributes: item.sku.data.attributes,
          quantity: item.quantity,
          length: item.length,
        }
      }),
    )
    setNote(data.attributes.note)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm className="row g-3 needs-validation">
      <ToastContainer />
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Th??ng tin</h5>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>C???a h??ng</CFormLabel>
                <InputDropdownSearch
                  placeholder="T??m ki???m c???a h??ng"
                  ajaxDataUrl={`${process.env.REACT_APP_STRAPI_URL}/api/branches`}
                  ajaxDataPopulate={[]}
                  ajaxDataGetFilters={(value) => {
                    return {
                      $or: [{ name: { $containsi: value } }],
                    }
                  }}
                  ajaxDataGetItemName={(item) => `${item.attributes.name}`}
                  handleNotFound={() => toast.error('Kh??ng t??m th???y c???a h??ng n??y !!!')}
                  handleFound={(item) => setBranch(item.id)}
                  setTextNameAfterFound={true}
                  defaultName={branchName}
                  view={true}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> M?? t??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i / SP (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> S??? l?????ng </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/products/view?id=${item.id}`}>{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell>
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.length}
                            onChange={(e) => handleChangeLength(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(index, e.target.value)}
                          ></CFormInput>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="5"> T???ng gi?? tr??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products.reduce((sum, item) => sum + parseInt(item.quantity), 0)
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableFoot>
                </CTable>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Ghi ch??</CFormLabel>
                <CFormTextarea
                  placeholder="Nh???p ghi ch??"
                  rows="5"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>Kh??ng h???p l???!</CFormFeedback>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Add
