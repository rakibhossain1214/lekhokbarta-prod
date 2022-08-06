import React, { useState } from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
const defaultTheme = require('tailwindcss/defaultTheme')
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Compressor from 'compressorjs'

const storage = getStorage()
const metadata = {
  contentType: 'image/jpeg',
}

const CustomSunEditor = (props) => {
  function handleImageUploadBefore(files, info, uploadHandler) {
    const storageRef = ref(storage, 'images/' + props.postId + '/' + files[0].name)
    const image = files[0]
    new Compressor(image, {
      quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        // setCompressedFile(compressedResult)
        const uploadTask = uploadBytesResumable(storageRef, compressedResult, metadata)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break
              case 'storage/canceled':
                // User canceled the upload
                break
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const response = {
                // The response must have a "result" array.
                result: [
                  {
                    url: downloadURL,
                    name: files[0].name,
                    size: files[0].size,
                  },
                ],
              }
              uploadHandler(response)
            })
          }
        )
      },
    })
  }

  return (
    <div style={{ border: '1px solid #e5e5e5' }}>
      <SunEditor
        className="prose max-w-none"
        setOptions={{
          buttonList:
            screen.width >= 768
              ? [
                  ['fullScreen'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor', 'textStyle'],
                  ['align', 'list', 'outdent', 'indent'],
                  ['strike', 'subscript', 'superscript', 'horizontalRule', 'removeFormat'],
                  ['link', 'table', 'image', 'video'],
                  ['undo', 'redo'],
                ]
              : [
                  ['bold', 'underline', 'italic'],
                  [':t-More Text-default.more_text', 'font', 'fontSize', 'formatBlock'],
                  [
                    ':p-More Paragraph-default.more_paragraph',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'align',
                    'list',
                    'outdent',
                    'indent',
                    'strike',
                    'subscript',
                    'superscript',
                    'horizontalRule',
                    'removeFormat',
                  ],
                  [':r-More Rich-default.more_plus', 'link', 'table', 'image', 'video'],
                  ['undo', 'redo'],
                  ['fullScreen'],
                  // [':i-More Misc-default.more_vertical','fullScreen', 'showBlocks'],
                ],

          // imageFileInput: false,
          minHeight: 300,
          defaultStyle: 'font-size:16px; font-family: Arial',
          font: [
            'Arial',
            'Roboto',
            'tahoma',
            'Courier New,Courier',
            'sans-serif',
            'Georgia',
            'Verdana',
            'Comic Sans MS',
            'Trebuchet MS',
            'impact',
          ],
          formats: ['p', 'h1', 'h2', 'h3', 'h4', 'blockquote'],
          mode: 'classic',
          imageUploadSizeLimit: '1000000',
        }}
        setContents={props.editorContent}
        onChange={props.handleChange}
        onImageUploadBefore={handleImageUploadBefore}
      />
    </div>
  )
}

export default CustomSunEditor
