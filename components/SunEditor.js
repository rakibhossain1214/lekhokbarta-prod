import React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
const defaultTheme = require('tailwindcss/defaultTheme')

const CustomSunEditor = (props) => {
  // console.log(props)
  return (
    <div style={{ border: '1px solid #e5e5e5' }}>
      <SunEditor
        className="prose max-w-none"
        setOptions={{
          buttonList:
            screen.width >= 768
              ? [
                  ['fullScreen', 'showBlocks'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor'],
                  ['align', 'list', 'outdent', 'indent'],
                  ['strike', 'subscript', 'superscript', 'horizontalRule', 'removeFormat'],
                  ['link', 'table', 'image', 'video'],
                  ['undo', 'redo'],
                ]
              : [
                  ['fullScreen', 'showBlocks'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['align', 'list', 'outdent', 'indent'],
                  ['strike', 'subscript', 'superscript', 'horizontalRule', 'removeFormat'],
                  ['link', 'table', 'image', 'video'],
                  '/',
                  ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor'],
                  ['undo', 'redo'],
                ],

          imageFileInput: false,
          minHeight: 300,
          defaultStyle: 'font-size:16px; font-family: Arial',
          font: [...defaultTheme.fontFamily.sans],
          mode: 'classic',
        }}
        setContents={props.editorContent}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default CustomSunEditor
