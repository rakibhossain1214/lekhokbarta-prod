import React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor, { buttonList } from 'suneditor-react'
const defaultTheme = require('tailwindcss/defaultTheme')

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
  'hello',
]

const CustomSunEditor = () => {
  console.log(JSON.stringify(buttonList.complex))
  return (
    <SunEditor
      className="prose max-w-none"
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['align', 'list', 'outdent', 'indent'],
          ['table', 'link', 'image', 'video', 'fullScreen', 'showBlocks'],
          ['strike', 'subscript', 'superscript', 'horizontalRule', 'removeFormat'],
          ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor'],
          ['preview', 'save'],
        ],
        imageFileInput: false,
        minHeight: 300,
        defaultStyle: 'font-size:16px; font-family: Arial',
        font: [...defaultTheme.fontFamily.sans],
        // mode: 'classic',
        callBackSave: function (contents, isChanged) {
          // alert(contents); => html output
          // alert(isChanged); => True/False
        },
      }}
    />
  )
}

export default CustomSunEditor
