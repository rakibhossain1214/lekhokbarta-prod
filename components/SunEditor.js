import React, { useState } from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
const defaultTheme = require('tailwindcss/defaultTheme')
import { UploadToServer } from '@/lib/firestoreConnection'

const CustomSunEditor = (props) => {
  async function handleImageUploadBefore(files, info, uploadHandler) {
    // uploadHandler is a function
    // Upload image to Server
    const src = await UploadToServer(files[0], props.postId);
    // result
    const response = {
      // The response must have a "result" array.
      "result": [
        {
          "url": src,
          "name": files[0].name,
          "size": files[0].size
        },
      ]
    }
    uploadHandler(response);
  }

  // function handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
  //   // console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
  //   console.log(imageInfo)
  // }

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

          // imageFileInput: false,
          minHeight: 300,
          defaultStyle: 'font-size:16px; font-family: Arial',
          font: [...defaultTheme.fontFamily.sans],
          mode: 'classic',
          imageUploadSizeLimit: "2500000",
        }}
        setContents={props.editorContent}
        onChange={props.handleChange}
        onImageUploadBefore={handleImageUploadBefore}
        // onImageUpload={handleImageUpload}
      />
    </div>
  )
}

export default CustomSunEditor
