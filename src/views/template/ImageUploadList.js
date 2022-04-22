import React, { useState, useEffect } from 'react'

import { CCard } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from 'src/views/template/ImageUpload'

import PropTypes from 'prop-types'

const ImageUploadList = (props) => {
  const [images, setImages] = useState([])
  const addProductImage = () => {
    let newImagesList = [
      ...props.data,
      {
        id: null,
        attributes: {
          url: null,
        },
      },
    ]
    props.setData(newImagesList)
  }
  const handleChangeImage = (index, resImageData) => {
    let data = [...props.data]
    const newImageData = {
      id: resImageData.id,
      attributes: { url: resImageData.url },
    }
    if (data.length === 0) {
      data = [newImageData]
    } else {
      data[index] = newImageData
    }
    props.setData(data)
  }
  const handleRemoveImage = (index) => {
    let data = [...props.data]
    data.splice(index, 1)
    props.setData(data)
    setImages([])
  }

  useEffect(() => {
    setImages(props.data)
  }, [props.data])

  return (
    <div>
      {images.map((item, index) => (
        <ImageUpload
          key={index}
          default={item.attributes.url}
          handleUploadImage={(resImageData) => handleChangeImage(index, resImageData)}
          handleResetImage={() => handleRemoveImage(index)}
        ></ImageUpload>
      ))}
      <CCard
        className="p-2 mb-3 d-flex justify-content-center align-items-center"
        onClick={addProductImage}
        role="button"
        color="info"
        textColor="white"
      >
        <div>
          <FontAwesomeIcon icon={faPlus} /> <strong>Hình ảnh</strong>
        </div>
      </CCard>
    </div>
  )
}

ImageUploadList.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
}

export default ImageUploadList
