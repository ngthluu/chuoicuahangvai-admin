import React from 'react'

import PropTypes from 'prop-types'

const ProductDescription = (props) => {
  return (
    <>
      {props.attributes.color != null && (
        <div>
          <strong>Màu sắc: </strong> {props.attributes.color}
        </div>
      )}
      {props.attributes.pattern.data != null && (
        <div>
          <strong>Kiểu mẫu: </strong> {props.attributes.pattern.data.attributes.name}
        </div>
      )}
      {props.attributes.width.data != null && (
        <div>
          <strong>Chiều rộng: </strong> {props.attributes.width.data.attributes.name}
        </div>
      )}
      {props.attributes.stretch.data != null && (
        <div>
          <strong>Co giãn: </strong> {props.attributes.stretch.data.attributes.name}
        </div>
      )}
      {props.attributes.origin.data != null && (
        <div>
          <strong>Xuất xứ: </strong> {props.attributes.origin.data.attributes.name}
        </div>
      )}
    </>
  )
}
ProductDescription.propTypes = { attributes: PropTypes.object }

export default ProductDescription
