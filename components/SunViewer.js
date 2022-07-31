import React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'

const CustomSunEditor = (props) => {
  // console.log("Editor: ", props.editorContent)
  return (
    <SunEditor
      setOptions={{
        width: '100%',
        height: '100%',
        minHeight: '350px',
        defaultStyle: 'font-size:16px; font-family: Arial;',
        resizingBar: false,
        showPathLabel: false,
        resizeEnable: false,
        tabDisable: true,
        className:
          'prose sun-editor-edit max-w-none dark:prose-invert dark:prose-headings:text-gray-100 dark:prose-p:text-gray-400 dark:prose-strong:text-gray-300 dark:prose-table:text-gray-300 dark:prose-lead:text-gray-300',
      }}
      setContents={props.editorContent}
      disable={true}
      readOnly={true}
      hideToolbar={true}
    />
  )
}

export default CustomSunEditor
