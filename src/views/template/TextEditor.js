import React from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import PropTypes from 'prop-types'

const TextEditor = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  return (
    <div className="text-editor">
      <ReactQuill
        onChange={props.setValue}
        theme="snow"
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </div>
  )
}

TextEditor.propTypes = {
  setValue: PropTypes.func,
}

export default TextEditor
