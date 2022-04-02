import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

import PropTypes from 'prop-types'

const SmartPagination = (props) => {
  const handleClickPage = (page) => {
    console.log(page)
    props.setPage(page)
  }

  const handleClickPrevious = () => {
    if (props.activePage > 1) props.setPage(props.activePage - 1)
  }

  const handleClickNext = () => {
    if (props.activePage < Math.ceil(props.totalItems / props.pageSize))
      props.setPage(props.activePage + 1)
  }

  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem aria-label="Previous" onClick={handleClickPrevious}>
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {[...Array(Math.ceil(props.totalItems / props.pageSize))].map((item, index) => (
        <CPaginationItem
          onClick={() => handleClickPage(index + 1)}
          key={index}
          active={props.activePage === index + 1}
        >
          {index + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem aria-label="Next" onClick={handleClickNext}>
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}

SmartPagination.propTypes = {
  activePage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  setPage: PropTypes.func,
}

export default SmartPagination
