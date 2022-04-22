import React, { useRef, useState } from 'react'
import axios from 'axios'
import { CImage, CFormInput, CButton } from '@coreui/react'
import dumbImage from 'src/assets/images/upload-image.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types'

const ImageUpload = (props) => {
  const [image, setImage] = useState(
    props.default ? `${process.env.REACT_APP_STRAPI_URL}${props.default}` : dumbImage,
  )
  const fileInputRef = useRef(null)

  const handleClickImage = (e) => {
    fileInputRef.current.click()
  }

  const handleChangeInput = async (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let formData = new FormData()
      formData.append(`files`, file, file.name)
      const response = await axios.post(
        `${process.env.REACT_APP_STRAPI_URL}/api/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      props.handleUploadImage(response.data[0])
      setImage(URL.createObjectURL(file))
    }
  }

  const handleResetImage = (e) => {
    setImage(dumbImage)
    fileInputRef.current.value = ''
    props.handleResetImage()
  }

  return (
    <div
      className="position-relative m-2"
      style={{ width: 'fit-content', display: 'inline-block' }}
    >
      <CImage className="mb-3" width="180" src={image} onClick={handleClickImage}></CImage>
      <CButton
        className="position-absolute btn-sm btn-danger"
        style={{ right: 0 }}
        onClick={handleResetImage}
      >
        <FontAwesomeIcon icon={faTimes} color="white" />
      </CButton>
      <CFormInput type="file" ref={fileInputRef} hidden onChange={handleChangeInput} />
    </div>
  )
}

ImageUpload.propTypes = {
  default: PropTypes.string,
  handleUploadImage: PropTypes.func,
  handleResetImage: PropTypes.func,
}

export default ImageUpload
