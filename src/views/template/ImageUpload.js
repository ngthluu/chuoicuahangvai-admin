import React, { useRef, useState } from 'react'
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

  const handleChangeInput = (e) => {
    if (e.target.files.length > 0) setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleResetImage = (e) => {
    setImage(dumbImage)
  }

  return (
    <div className="position-relative">
      <CImage className="mb-3" width="180" src={image} onClick={handleClickImage}></CImage>
      <CButton
        className="position-absolute btn-sm btn-danger"
        style={{ right: 0 }}
        onClick={handleResetImage}
      >
        <FontAwesomeIcon icon={faTimes} color="white" />
      </CButton>
      <CFormInput
        name={props.name}
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleChangeInput}
      />
    </div>
  )
}

ImageUpload.propTypes = {
  name: PropTypes.string,
  default: PropTypes.string,
}

export default ImageUpload
