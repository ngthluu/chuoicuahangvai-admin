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
  CBadge,
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
import ProductDescription from 'src/views/products/ProductDescription'
import ActionButtons from './ActionButtons'

const View = () => {
  const query = useLocation().search
  const id = new URLSearchParams(query).get('id')

  const [orderCode, setOrderCode] = useState('')
  const [createdTime, setCreatedTime] = useState('')
  const [branchName, setBranchName] = useState('')

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [products, setProducts] = useState([])
  const [note, setNote] = useState('')
  const [statuses, setStatuses] = useState([])

  const [receiveAddressFirstName, setReceiveAddressFirstName] = useState('')
  const [receiveAddressLastName, setReceiveAddressLastName] = useState('')
  const [receiveAddressPhone, setReceiveAddressPhone] = useState('')
  const [receiveAddressAddress, setReceiveAddressAddress] = useState('')
  const [receiveAddressWard, setReceiveAddressWard] = useState('')
  const [receiveAddressDistrict, setReceiveAddressDistrict] = useState('')
  const [receiveAddressCity, setReceiveAddressCity] = useState('')

  const [deliveryMethodAmount, setDeliveryMethodAmount] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [orderInvoice, setOrderInvoce] = useState('')

  const [discountValue, setDiscountValue] = useState('')

  const fetchData = async () => {
    if (id === null) return
    const query = qs.stringify(
      {
        populate: [
          'customer',
          'customer.name',
          'branch',
          'products',
          'products.inventory_item',
          'products.inventory_item.sku_quantity',
          'products.inventory_item.sku_quantity.sku',
          'products.inventory_item.sku_quantity.sku.product',
          'products.inventory_item.sku_quantity.sku.color',
          'products.inventory_item.sku_quantity.sku.pattern',
          'products.inventory_item.sku_quantity.sku.stretch',
          'products.inventory_item.sku_quantity.sku.width',
          'products.inventory_item.sku_quantity.sku.origin',
          'products.inventory_item.sku_quantity.sku.images',
          'order_statuses',
          'order_statuses.update_user',
          'receive_address',
          'receive_address.name',
          'receive_address.address',
          'receive_address.address.address_three_levels',
          'delivery_method',
          'order_invoice',
        ],
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`
      ${process.env.REACT_APP_STRAPI_URL}/api/orders/${id}?${query}`)
    const data = response.data.data

    setOrderCode(`${data.attributes.type.toUpperCase()}#${data.id}`)
    setCreatedTime(data.attributes.createdAt)
    setBranchName(data.attributes.branch.data.attributes.name)

    setEmail(data.attributes.customer.data.attributes.email)
    setPhone(data.attributes.customer.data.attributes.phone)
    setFirstName(
      data.attributes.customer.data.attributes.name
        ? data.attributes.customer.data.attributes.name.firstname
        : '',
    )
    setFirstName(
      data.attributes.customer.data.attributes.name
        ? data.attributes.customer.data.attributes.name.lastname
        : '',
    )

    if (data.attributes.receive_address) {
      setReceiveAddressFirstName(data.attributes.receive_address.name.firstname)
      setReceiveAddressLastName(data.attributes.receive_address.name.lastname)
      setReceiveAddressPhone(data.attributes.receive_address.phone)
      setReceiveAddressAddress(data.attributes.receive_address.address.address)
      setReceiveAddressWard(
        data.attributes.receive_address.address.address_three_levels.data.attributes.ward,
      )
      setReceiveAddressDistrict(
        data.attributes.receive_address.address.address_three_levels.data.attributes.district,
      )
      setReceiveAddressCity(
        data.attributes.receive_address.address.address_three_levels.data.attributes.city,
      )
    }

    if (data.attributes.delivery_method) {
      setDeliveryMethodAmount(data.attributes.delivery_method.amount)
      setDeliveryMethod(data.attributes.delivery_method.method)
    }

    if (data.attributes.order_invoice.data) {
      setOrderInvoce(data.attributes.order_invoice.data.id)
    }

    setProducts(
      data.attributes.products.map((item) => {
        const inventoryItem = item.inventory_item.data
        const skuItem = inventoryItem.attributes.sku_quantity.sku.data
        const productSku = skuItem.attributes.sku
        const productName = skuItem.attributes.product.data.attributes.name
        const productAttributes = skuItem.attributes
        const productItem = {
          componentId: item.id,
          id: inventoryItem.id,
          sku: productSku,
          name: productName,
          attributes: productAttributes,
          length: item.length,
          price: item.unit_price,
        }
        return productItem
      }),
    )
    setNote(data.attributes.note)
    setStatuses(data.attributes.order_statuses.data)
    setDiscountValue(data.attributes.discount_value ? data.attributes.discount_value : 0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Th??ng tin ????n h??ng</h5>
            <div>
              <ActionButtons
                id={id}
                code={orderCode}
                status={statuses.length > 0 ? statuses[statuses.length - 1].attributes.status : ''}
                invoice_id={orderInvoice}
                fetchData={fetchData}
              ></ActionButtons>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin ????n h??ng</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>M?? ????n h??ng: </div>
                  <div>{orderCode}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Mua t???i c???a h??ng: </div>
                  <div>{branchName}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>Th???i gian kh???i t???o: </div>
                  <div>{createdTime}</div>
                </div>
                {deliveryMethod !== '' ? (
                  <div className="d-flex justify-content-between mb-3">
                    <div>Ph????ng th???c v???n chuy???n: </div>
                    <div>
                      {deliveryMethod === 'fast' ? 'V???n chuy???n nhanh' : 'V???n chuy???n mi???n ph??'}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </CCol>
              <CCol md={2}></CCol>
              <CCol md={5} className="mb-3">
                <h6 className="mb-3">Th??ng tin ng?????i mua</h6>
                <div className="d-flex justify-content-between mb-3">
                  <div>Email ng?????i mua: </div>
                  <div>{email}</div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>H??? v?? t??n: </div>
                  <div>
                    {receiveAddressFirstName !== ''
                      ? `${receiveAddressFirstName} ${receiveAddressLastName}`
                      : `${firstName} ${lastName}`}
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div>S??? ??i???n tho???i: </div>
                  <div>{receiveAddressPhone !== '' ? receiveAddressPhone : phone}</div>
                </div>
                {receiveAddressWard !== '' ? (
                  <div className="d-flex justify-content-between mb-3">
                    <div>?????a ch??? nh???n h??ng: </div>
                    <div>
                      {receiveAddressAddress}, {receiveAddressWard}, {receiveAddressDistrict},{' '}
                      {receiveAddressCity}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> ID trong kho </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> M?? SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T??n SP </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> M?? t??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> ????n gi?? (??/m) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Chi???u d??i (cm) </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> T???ng c???ng (??) </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell> #{item.id} </CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/products/view?id=${item.id}`}>{item.sku}</Link>
                        </CTableDataCell>
                        <CTableDataCell>{item.name} </CTableDataCell>
                        <CTableDataCell>
                          <ProductDescription attributes={item.attributes}></ProductDescription>
                        </CTableDataCell>
                        <CTableDataCell> {parseInt(item.price).toLocaleString()} </CTableDataCell>
                        <CTableDataCell> {item.length} </CTableDataCell>
                        <CTableDataCell>
                          {parseInt(item.price * item.length * 0.01).toLocaleString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableFoot align="middle">
                    <CTableRow>
                      <CTableHeaderCell colSpan="7"> Gi?? tr??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce((sum, item) => sum + item.price * item.length * 0.01, 0)
                            .toLocaleString()
                        })()}
                      </CTableHeaderCell>
                    </CTableRow>
                    {deliveryMethod ? (
                      <>
                        <CTableRow>
                          <CTableHeaderCell colSpan="7"> Ph?? v???n chuy???n </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {parseInt(deliveryMethodAmount).toLocaleString()}
                          </CTableHeaderCell>
                        </CTableRow>
                      </>
                    ) : (
                      <></>
                    )}
                    <CTableRow>
                      <CTableHeaderCell colSpan="7"> Gi???m gi?? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        -{parseInt(discountValue).toLocaleString()}
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan="7"> T???ng gi?? tr??? </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {(() => {
                          return products
                            .reduce(
                              (sum, item) => sum + item.price * item.length * 0.01,
                              (deliveryMethod ? parseInt(deliveryMethodAmount) : 0) -
                                parseInt(discountValue),
                            )
                            .toLocaleString()
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
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>L???ch s??? c???p nh???t</CFormLabel>
                <CTable align="middle" bordered responsive>
                  <CTableHead align="middle" color="info">
                    <CTableRow>
                      <CTableHeaderCell scope="col"> # </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Tr???ng th??i </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Ng?????i c???p nh???t </CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Th???i gian </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody align="middle">
                    {statuses.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell> {index + 1} </CTableDataCell>
                        <CTableDataCell>
                          {item.attributes.status === 'initialize' ? (
                            <CBadge color="warning">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : item.attributes.status === 'confirmed' ||
                            item.attributes.status === 'packaged' ||
                            item.attributes.status === 'delivery' ? (
                            <CBadge color="primary">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : item.attributes.status === 'return' ||
                            item.attributes.status === 'canceled' ? (
                            <CBadge color="danger">{item.attributes.status.toUpperCase()}</CBadge>
                          ) : (
                            <CBadge color="success">{item.attributes.status.toUpperCase()}</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.attributes.update_user.data
                            ? item.attributes.update_user.data.attributes.username
                            : ''}
                        </CTableDataCell>
                        <CTableDataCell>{item.attributes.createdAt}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default View
