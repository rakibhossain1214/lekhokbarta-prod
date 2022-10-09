import React, { useState } from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { getPostFrontMatterByUserIdAndPostId, getAllTagsArray, updatePost, updatePostDraft, updatePostPublish } from '@/lib/firestoreConnection'
import { withProtected } from 'src/hook/route'
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import CreatableSelect from 'react-select/creatable'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(() => import('@/components/SunEditor'), {
  ssr: false,
})

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import Compressor from 'compressorjs'
import Image from '@/components/Image'
import kebabCase from '@/lib/utils/kebabCase'

const postValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Title must be 10 characters at minimum')
    .max(60, 'Title must be 60 characters at maximum')
    .required('Title is required'),
  category: Yup.string().required('Category is required'),
  summary: Yup.string()
    .required('Summary is required')
    .min(50, 'Summary must be 50 characters at minimum')
    .max(160, 'Summary must be 160 characters at maximum'),
  tags: Yup.array(),
})

const metadata = {
  contentType: 'image/jpeg',
}

function CreateContent({ postData, auth, tagsOptions, defaultTags }) {
  const { user } = auth
  const [imageLoad, setImageLoad] = useState(false)
  const [postThumbnail, setPostThumbnail] = useState(postData?.frontMatter?.postThumbnail || '')
  const [showToast, setShowToast] = useState(false)
  const [draftToast, setDraftToast] = useState(false)
  const [publishToast, setPublishToast] = useState(false)
  const [sourceToast, setSourceToast] = useState(false)
  const [postSource, setPostSource] = useState(postData?.referenceSources)

  const db = getFirestore()
  const storage = getStorage()
  let postRef = null

  if (postData !== 'NODATA' && postData !== null) {
    postRef = doc(db, 'posts', postData.postId)
  }

  if (postData?.authorDetails?.id !== user.uid || postData === 'NODATA') {
    return (
      <>
        <div className="mt-24 text-center">
          <PageTitle>
            You dont have permission!{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
          <Link href="/">
            <button className="focus:shadow-outline-blue my-5 inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Back to homepage
            </button>
          </Link>
        </div>
      </>
    )
  }

  const [selectedTags, setSelectedTags] = useState(defaultTags)

  const handleChange = (newValue) => {
    let tagArray = []
    newValue.map((node) => {
      tagArray.push({ label: kebabCase(node.label.toLowerCase()), value: kebabCase(node.value.toLowerCase()) })
    })
    setSelectedTags(tagArray)


    if (postRef !== null) {
      postData.frontMatter.tags = tagArray
      postData.frontMatter.draft = true
      postData.frontMatter.status = 'pending'
      setDoc(postRef, { ...postData, lastmod: new Date().toString() })
    }
  }

  function handleImageUploadBefore(files) {
    const storageRef = ref(storage, 'posts/thumbnails' + '/' + postData.postId)
    const image = files[0]
    setImageLoad(true)
    new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      width: 500,
      height: 350,
      resize: "cover",
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
                // console.log('Upload is paused')
                break
              case 'running':
                // console.log('Upload is running')
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
              const postRef = doc(db, 'posts', postData.postId)
              postData.frontMatter.postThumbnail = downloadURL
              postData.frontMatter.draft = true
              postData.frontMatter.status = 'pending'
              setDoc(postRef, {
                ...postData
              }).then(() => {
                setImageLoad(false)
                setPostThumbnail(downloadURL)
              })
            })
          }
        )
      },
    })
  }

  const handleThumbnailDelete = () => {
    const postRef = doc(db, 'posts', postData.postId)
    var fileRef = ref(storage, postThumbnail)
    deleteObject(fileRef)
      .then(() => {
        postData.frontMatter.postThumbnail = ''
        postData.frontMatter.draft = true
        postData.frontMatter.status = 'pending'
        setDoc(postRef, {
          ...postData
        }).then(() => {
          setPostThumbnail('')
        })
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })
  }

  const handlePostDraft = () => {
    updatePostDraft({ postData })
    setDraftToast(true)
    setTimeout(() => {
      setDraftToast(false)
    }, 3000);
  }

  const handlePostPublish = () => {
    updatePostPublish({ postData })
    setPublishToast(true)
    setTimeout(() => {
      setPublishToast(false)
    }, 3000);
  }

  const handleSourceSave = (e) => {
    e.preventDefault()
    postData.referenceSources = postSource
    updatePostDraft({ postData })
    setSourceToast(true)
    setTimeout(() => {
      setSourceToast(false)
    }, 3000);
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <h5>Notes: Updating any field of your blog after publishing will lead to another review process.</h5>
      <div className='flex justify-start my-2 pt-6'>
        <div className="text-base font-medium leading-6">
          {
            !imageLoad ?
              postThumbnail !== undefined && postThumbnail !== '' ?
                <div className='flex'>
                  <>
                    <Image
                      src={postThumbnail}
                      width="120px"
                      height="80px"
                      alt="avatar"
                      className="border-none align-middle shadow-lg"
                    />
                    <button className='flex items-start -ml-1 h-6 w-6' onClick={handleThumbnailDelete}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="h-5 w-5 rounded-full text-gray-100 bg-red-500 -ml-1 z-10 shadow-lg" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </>
                </div>
                :
                ''
              :
              <div style={{ height: '80px', width: '120px' }} className="flex justify-items-center align-items-center">
                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>

          }
          <button className='flex items-start bg-teal-500 p-1 rounded text-gray-100 mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            <input className="cursor-pointer absolute opacity-0 block pin-r pin-t" type="file" style={{ width: '145px', height: '32px' }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event) => {
                handleImageUploadBefore(event.target.files)
              }}
            />
            Add thumbnail
          </button>
        </div>
      </div>
      <div className='flex justify-end my-2 pt-2'>
        <div className="text-base font-medium leading-6">
          <button onClick={handlePostDraft} className="focus:shadow-outline-blue mx-1 inline rounded-lg border border-transparent bg-red-500 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
            Draft
          </button>
        </div>
        <div className="text-base font-medium leading-6">
          <button onClick={handlePostPublish} className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
            Publish
          </button>
        </div>
      </div>

      <SunEditor postData={postData} editorContent={postData.content} />

      <div className="flex justify-center">
        <div className="mb-3 mt-3 w-full">
          <div className='flex items-center justify-between'>
            <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 mr-2 text-gray-700 pt-2">Sources</label>
            <button className='text-gray-100 flex bg-teal-500 rounded mr-2' onClick={handleSourceSave}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-1 w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              <span className='mr-2'>Save</span>
            </button>
          </div>
          <textarea
            className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder='Example: 1. Joan Bloggs, "This Is An Important Academic Blog," World of Clever Blogging (blog), December, 25, 2015, http://www.topuniversities.com'
            value={postSource}
            onChange={(e) => setPostSource(e.target.value)}
          ></textarea>
        </div>
      </div>

      <Accordion className='mt-3'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-primary-400">More...</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Formik
            initialValues={{ title: postData.frontMatter.title, category: postData.frontMatter.category, summary: postData.frontMatter.summary }}
            validationSchema={postValidationSchema}
            onSubmit={(values) => {
              updatePost({ postData, values, selectedTags })
              setShowToast(true)
              setTimeout(() => {
                setShowToast(false)
              }, 3000);
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
              // !isSubmitting ? (
              <Form className="mt-5 w-full">
                <div className="form-group">
                  <div className="border-b border-teal-500 py-1">
                    <Field
                      className={`focus:outline-none} w-full 
                      appearance-none border-none bg-transparent py-2 leading-tight 
                      text-gray-600 dark:bg-white
                      ${touched.title && errors.title ? 'is-invalid' : ''}
                      `}
                      type="text"
                      placeholder="Blog title (max: 50 characters)"
                      aria-label="Title"
                      name="title"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage className="text-red-400 " component="p" name="title" />
                </div>

                <div className="form-group">
                  <div className="relative mt-5 inline-block w-64">
                    <Field
                      as="select"
                      name="category"
                      className="focus:shadow-outline block w-full appearance-none rounded border-b border-teal-500 bg-white px-4 py-2 pr-8 leading-tight text-gray-500 shadow hover:border-gray-500 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="trending">Trending</option>
                      <option value="review">Review</option>
                      <option value="sports">Sports</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="other">other</option>
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage className="text-red-400 " component="p" name="category" />
                </div>

                <div className="form-group">
                  <div className="relative mt-5 inline-block w-full">
                    <CreatableSelect
                      className="sun-editor-edit prose max-w-none dark:prose-invert dark:prose-headings:text-gray-100 dark:prose-p:text-gray-400 dark:prose-strong:text-gray-300 dark:prose-table:text-gray-300 dark:prose-lead:text-gray-300"
                      isMulti
                      onChange={handleChange}
                      options={tagsOptions}
                      defaultValue={defaultTags}
                      placeholder="tags [optional]"
                      styles={{
                        input: (base) => ({
                          ...base,
                          'input:focus': {
                            boxShadow: 'none',
                          },
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="form-group pt-4">
                  <div className="border-b border-teal-500 py-1">
                    <Field
                      className={`focus:outline-none} w-full 
                      appearance-none border-none bg-transparent py-1 leading-tight 
                      text-gray-600 dark:bg-white
                      ${touched.summary && errors.summary ? 'is-invalid' : ''}
                      `}
                      as="textarea"
                      placeholder="Blog Summary (max: 100 characters)"
                      aria-label="Summary"
                      name="summary"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage className="text-red-400 " component="p" name="summary" />
                </div>

                <div className="flex justify-end text-base font-medium leading-6">
                  <button
                    type="submit"
                    className="mt-3 flex items-center rounded border border-gray-200 bg-teal-500 pl-2 pr-2 pt-1 pb-1 text-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    Update
                  </button>

                </div>
              </Form>
            }
          </Formik>
        </AccordionDetails>
      </Accordion>
      {
        showToast ?
          <div id="myToast" className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg z-20 dark:bg-gray-700">
            <p className="text-sm">
              <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
              Your blog is updated!
            </p>
          </div>
          :
          ""
      }

      {
        draftToast ?
          <div id="myToast" className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg z-20 dark:bg-gray-700">
            <p className="text-sm">
              <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
              Your blog is drafted!
            </p>
          </div>
          :
          ""
      }

      {
        publishToast ?
          <div id="myToast" className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg z-20 dark:bg-gray-700">
            <p className="text-sm">
              <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
              Your blog is submitted for approval!
            </p>
          </div>
          :
          ""
      }

      {
        sourceToast ?
          <div id="myToast" className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg z-20 dark:bg-gray-700">
            <p className="text-sm">
              <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
              Your blog sources are updated and submitted for approval!
            </p>
          </div>
          :
          ""
      }

    </div>
  )
}

export default withProtected(CreateContent)

export async function getServerSideProps({ params }) {
  if (params.slug[1] === undefined || params.slug[0] === undefined) {
    return {
      props: { postData: null },
    }
  }

  const postData = await getPostFrontMatterByUserIdAndPostId(params.slug[0], params.slug[1])

  const tagsOptions = await getAllTagsArray()

  let defaultTags = [];

  postData?.frontMatter?.tags?.map((item) => {
    defaultTags.push({ label: item.label, value: item.value })
  })

  return {
    props: { postData: postData !== undefined ? postData : null, tagsOptions, defaultTags },
    // revalidate: 1
  }
}
