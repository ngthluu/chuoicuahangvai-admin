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
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from 'src/views/template/ImageUpload'

import PropTypes from 'prop-types'

const HomepageCustomerResponse = (props) => {
  const [data, setData] = useState([])
  const addCustomerResponse = () => {
    let newData = [
      ...props.data,
      {
        avatar: {
          data: {
            id: null,
            attributes: { url: null },
          },
        },
        name: '',
        address: '',
        description: '',
      },
    ]
    props.setData(newData)
  }
  const handleDeleteCustomerResponse = (index) => {
    let data = [...props.data]
    data.splice(index, 1)
    props.setData(data)
    setData([])
  }

  const handleChangeImage = (index, resImageData) => {
    let data = [...props.data]
    data[index].avatar = {
      data: {
        id: resImageData.id,
        attributes: { url: resImageData.url },
      },
    }
    props.setData(data)
  }
  const handleRemoveImage = (index) => {
    let data = [...props.data]
    data[index].avatar = {
      data: {
        id: null,
        attributes: { url: null },
      },
    }
    props.setData(data)
  }
  const handleChangeName = (index, value) => {
    let newData = [...props.data]
    newData[index].name = value
    props.setData(newData)
  }
  const handleChangeAddress = (index, value) => {
    let newData = [...props.data]
    newData[index].address = value
    props.setData(newData)
  }
  const handleChangeDescription = (index, value) => {
    let newData = [...props.data]
    newData[index].description = value
    props.setData(newData)
  }

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div>
      <CRow>
        {data.map((item, index) => (
          <CCol key={index} md={3} className="mb-3">
            <CCard className="border-info">
              <CCardHeader>
                <CButton
                  type="button"
                  className="float-end"
                  color="danger"
                  onClick={() => handleDeleteCustomerResponse(index)}
                >
                  <FontAwesomeIcon icon={faTimes} color="white" />
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md={12} className="mb-3">
                    <CFormLabel>Avatar</CFormLabel>
                    <div>
                      <ImageUpload
                        default={item.avatar.data ? item.avatar.data.attributes.url : null}
                        handleUploadImage={(resImageData) => handleChangeImage(index, resImageData)}
                        handleResetImage={() => handleRemoveImage(index)}
                      ></ImageUpload>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12} className="mb-3">
                    <CFormLabel>Tên</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Tên"
                      value={item.name}
                      onChange={(e) => handleChangeName(index, e.target.value)}
                      required
                    />
                    <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12} className="mb-3">
                    <CFormLabel>Địa chỉ</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Địa chỉ"
                      value={item.address}
                      onChange={(e) => handleChangeAddress(index, e.target.value)}
                      required
                    />
                    <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12} className="mb-3">
                    <CFormLabel>Mô tả</CFormLabel>
                    <CFormTextarea
                      placeholder="Mô tả"
                      value={item.description}
                      onChange={(e) => handleChangeDescription(index, e.target.value)}
                    ></CFormTextarea>
                    <CFormFeedback invalid>Không hợp lệ!</CFormFeedback>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CCard
        className="p-2 mb-3 d-flex justify-content-center align-items-center"
        onClick={addCustomerResponse}
        role="button"
        color="info"
        textColor="white"
      >
        <div>
          <FontAwesomeIcon icon={faPlus} /> <strong>Phản hồi từ khách hàng</strong>
        </div>
      </CCard>
    </div>
  )
}

HomepageCustomerResponse.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
}

export default HomepageCustomerResponse
