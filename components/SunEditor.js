import React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
const defaultTheme = require('tailwindcss/defaultTheme')

const CustomSunEditor = (props) => {
  // console.log(props)
  return (
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
                ['undo', 'redo', 'save', 'preview'],
              ]
            : [
                ['fullScreen', 'showBlocks'],
                ['font', 'fontSize', 'formatBlock'],
                ['align', 'list', 'outdent', 'indent'],
                ['strike', 'subscript', 'superscript', 'horizontalRule', 'removeFormat'],
                ['link', 'table', 'image', 'video'],
                '/',
                ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor'],
                ['undo', 'redo', 'save', 'preview'],
              ],

        imageFileInput: false,
        minHeight: 300,
        defaultStyle: 'font-size:16px; font-family: Arial',
        font: [...defaultTheme.fontFamily.sans],
        mode: 'classic',
        callBackSave: function (contents, isChanged) {
          // alert(contents); => html output
          // alert(isChanged); => True/False
        },
      }}
      setContents={props.editorContent}
      onChange={props.handleChange}
    />
  )
}

export default CustomSunEditor
