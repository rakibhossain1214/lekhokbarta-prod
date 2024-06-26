import React, { useState } from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
import uuid from 'react-uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import Compressor from 'compressorjs'
import { addEditorPhotosToDb, updatePostContent } from '@/lib/firestoreConnection'
import { updatePostContentForImageUpload } from '../lib/firestoreConnection'

const storage = getStorage()
const metadata = {
  contentType: 'image/jpeg',
}

const CustomSunEditor = (props) => {
  const [showToast, setShowToast] = useState(false)
  let contentForImage = props.postData.content

  function handleImageUploadBefore(files, info, uploadHandler) {
    const storageRef = ref(storage, 'post-images/' + props.postData.postId + '/' + uuid())
    const image = files[0]
    new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
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

  let imageArray = []
  function onImageUpload(targetElement, index, state, imageInfo, remainingFilesCount) {
    if (state === 'delete') {
      // Create a reference to the file to delete
      var fileRef = ref(storage, imageArray[index])
      // Delete the file
      try {
        deleteObject(fileRef)
          .then(() => {
            // File deleted successfully
            if (index > -1) {
              // only splice array when item is found
              imageArray.splice(index, 1) // 2nd parameter means remove one item only
            }
            addEditorPhotosToDb({ postData: props.postData, imageArray })
            .then(() => {
              var cont = contentForImage
              cont = cont.replace(/<[^>]*>/g, ' ')
              cont = cont.replace(/\s+/g, ' ')
              cont = cont.trim()
              var n = cont.split(' ').length

              updatePostContent({
                postData: props.postData,
                content: contentForImage,
                wordCount: n,
              })
              setShowToast(true)
              setTimeout(() => {
                setShowToast(false)
              }, 3000)
            })
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
          })
      } catch (e) {
        alert('something went wrong. Please try again.')
      }
    } else {
      if (state === 'create') {
        imageArray.push(imageInfo.src)
      }
    }

    if (remainingFilesCount === 0) {
      addEditorPhotosToDb({ postData: props.postData, imageArray })
      .then(() => {
        var cont = contentForImage
        cont = cont.replace(/<[^>]*>/g, ' ')
        cont = cont.replace(/\s+/g, ' ')
        cont = cont.trim()
        var n = cont.split(' ').length

        updatePostContentForImageUpload({
          postData: props.postData,
          content: contentForImage,
          wordCount: n,
        })
      })
    }
  }

  const handleEditorChange = (content) => {
    contentForImage = content
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
                ['save'],
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
                ['save'],
              ],
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
          callBackSave: function (contents, isChanged) {
            // var cont = $("#content").html();
            var cont = contents
            cont = cont.replace(/<[^>]*>/g, ' ')
            cont = cont.replace(/\s+/g, ' ')
            cont = cont.trim()
            var n = cont.split(' ').length

            if (isChanged) {
              updatePostContent({
                postData: props.postData,
                content: contents,
                wordCount: n,
              })
              setShowToast(true)
              setTimeout(() => {
                setShowToast(false)
              }, 3000)
            }
          },
          charCounter: true,
          charCounterLabel: 'count',
        }}
        setContents={props.editorContent}
        onImageUploadBefore={handleImageUploadBefore}
        onImageUpload={onImageUpload}
        onChange={handleEditorChange}
      />

      {showToast ? (
        <div
          id="myToast"
          className="fixed right-10 bottom-10 z-20 border-r-8 border-blue-500 bg-white px-5 py-4 drop-shadow-lg dark:bg-gray-700"
        >
          <p className="text-sm">
            <span className="mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 font-extrabold text-white">
              i
            </span>
            Your blog content is updated and drafted!
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default CustomSunEditor
