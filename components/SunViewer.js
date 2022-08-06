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
          `prose sun-editor-edit max-w-none 
          dark:prose-invert dark:prose-headings:text-gray-100 
          dark:prose-p:text-gray-400 dark:prose-strong:text-gray-300 
          dark:prose-table:text-gray-300 dark:prose-lead:text-gray-300
          dark:prose-h1:text-gray-300 dark:prose-h2:text-gray-300
          dark:prose-h3:text-gray-300 dark:prose-h4:text-gray-300
          dark:prose-blockquote:text-gray-300 dark:prose-figure:text-gray-300
          dark:prose-figcaption:text-gray-300 dark:prose-em:text-gray-300
          dark:prose-pre:text-gray-300 dark:prose-ol:text-gray-300 dark:prose-ul:text-gray-300 
          dark:prose-li:text-gray-300 dark:prose-thread:text-gray-300
          dark:prose-tr:text-gray-300 dark:prose-th:bg-gray-800
          dark:prose-td:text-gray-300 
          `,
      }}
      setContents={props.editorContent}
      disable={true}
      readOnly={true}
      hideToolbar={true}
    />
  )
}

export default CustomSunEditor
