import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

import { CButton, CInputGroup, CFormInput } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types'

const InputDropdownSearch = (props) => {
  const [visibleUl, setVisibleUl] = useState(false)
  const [text, setText] = useState('')
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    setText(props.defaultName || '')
  }, [props.defaultName])

  const fetchData = async () => {
    const query = qs.stringify(
      {
        populate: props.ajaxDataPopulate,
        filters: props.ajaxDataGetFilters(text),
      },
      { encodeValuesOnly: true },
    )
    const response = await axios.get(`${props.ajaxDataUrl}?${query}`)
    return response.data.data
  }

  const handleSearchAndSubmit = async () => {
    const searchData = await fetchData()
    if (searchData.length === 0) {
      props.handleNotFound()
      return
    } else {
      props.handleFound(searchData[0])
    }
    setVisibleUl(false)
    if (props.setTextNameAfterFound) {
      setText(props.ajaxDataGetItemName(searchData[0]))
    } else {
      setText('')
    }
  }

  const handleClickSearchButton = async () => {
    const searchData = await fetchData()
    if (searchData.length === 0) {
      props.handleNotFound()
      setVisibleUl(false)
    } else {
      setSearchData(searchData)
      setVisibleUl(true)
    }
  }

  const handleClickResetButton = async () => {
    setText('')
    setVisibleUl(false)
    props.handleFound({ id: '' })
  }

  const handleClickLi = (item) => {
    setVisibleUl(false)
    props.handleFound(item)
    if (props.setTextNameAfterFound) {
      setText(props.ajaxDataGetItemName(item))
    }
  }

  const dropDownUlStyle = {
    width: '100%',
    maxHeight: '300px',
    background: '#FFF',
    border: 'solid 1px #CCC',
    borderTop: 'none',
    padding: '10px',
    position: 'absolute',
    top: '100%',
    overflow: 'auto',
    zIndex: 9999,
    display: visibleUl ? 'block' : 'none',
  }

  const dropDownLiStyle = {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    listStyleType: 'none',
    cursor: 'pointer',
    float: 'left',
  }

  return (
    <div className="mb-3 position-relative">
      <CInputGroup>
        <CFormInput
          placeholder={props.placeholder}
          aria-label={props.placeholder}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearchAndSubmit()
            return e.key === 'Enter' && e.preventDefault()
          }}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <CButton
          type="button"
          color="danger"
          className="text-white border-right"
          onClick={handleClickResetButton}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CButton>
        <CButton
          type="button"
          color="info"
          className="text-white"
          onClick={handleClickSearchButton}
        >
          <FontAwesomeIcon icon={faSearch} />
        </CButton>
      </CInputGroup>
      <ul style={dropDownUlStyle}>
        {searchData.map((item, index) => (
          <li style={dropDownLiStyle} key={index} onClick={() => handleClickLi(item)}>
            {props.ajaxDataGetItemName(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}

InputDropdownSearch.propTypes = {
  placeholder: PropTypes.string,
  ajaxDataUrl: PropTypes.string,
  ajaxDataPopulate: PropTypes.array,
  ajaxDataGetFilters: PropTypes.func,
  ajaxDataGetItemName: PropTypes.func,
  handleNotFound: PropTypes.func,
  handleFound: PropTypes.func,
  setTextNameAfterFound: PropTypes.bool,
  defaultName: PropTypes.string,
}

export default InputDropdownSearch
