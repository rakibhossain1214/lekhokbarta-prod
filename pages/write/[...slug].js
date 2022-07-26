import React, { useState } from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { getPostFrontMatterByUserIdAndPostId } from '@/lib/firestoreConnection'
import { withProtected } from 'src/hook/route'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import dynamic from 'next/dynamic'
import { title } from '@/data/siteMetadata'
const SunEditor = dynamic(() => import('@/components/SunEditor'), {
  ssr: false,
})

function CreateContent({ postData, auth }) {
  const { user, logout } = auth
  const [titleError, setTitleError] = useState('')
  const [summaryError, setSummaryError] = useState('')
  const [category, setCategory] = useState(postData?.frontMatter?.category[0])

  const db = getFirestore()
  let postRef = null

  if (postData !== 'NODATA' && postData !== null) {
    postRef = doc(db, 'posts', postData.postId)
  }

  const handleChangeEditor = (data) => {
    if (postRef !== null) {
      postData.frontMatter.content = data
      setDoc(postRef, { ...postData })
    }
  }

  const handleChangeTitle = (data) => {
    if (data.target.value.length < 5) {
      setTitleError('Title must be 5 characters at minimum')
    } else if (data.target.value.length > 100) {
      setTitleError('Title must be 100 characters at maximum')
    } else {
      setTitleError('')
      if (postRef !== null) {
        postData.frontMatter.title = data.target.value
        setDoc(postRef, { ...postData })
      }
    }
  }

  const handleChangeCategory = (data) => {
    if (postRef !== null) {
      setCategory(data.target.value)
      postData.frontMatter.category[0] = data.target.value
      setDoc(postRef, { ...postData })
    }
  }

  const handleChangeSummary = (data) => {
    if (data.target.value.length < 10) {
      setSummaryError('Summary must be 10 characters at minimum')
    } else if (data.target.value.length > 100) {
      setSummaryError('Summary must be 100 characters at maximum')
    } else {
      setSummaryError('')
      if (postRef !== null) {
        postData.frontMatter.summary = data.target.value
        setDoc(postRef, { ...postData })
      }
    }
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

  return (
    <div>
      {/* <Typography variant="h6" className="text-red-400">All Data will be saved automatically in real time.</Typography> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-primary-400">More...</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full">
            <div className="form-group w-full">
              <div className="border-b border-teal-500 py-1">
                Title:
                <input
                  className={`w-full 
                      appearance-none border-none bg-transparent py-1 leading-tight 
                      text-gray-500 dark:text-gray-400`}
                  type="text"
                  placeholder="Blog title"
                  aria-label="Title"
                  name="title"
                  defaultValue={postData.frontMatter.title}
                  onChange={handleChangeTitle}
                  autoComplete="off"
                />
              </div>
              <div className="text-red-400 " component="p">
                {titleError}
              </div>
            </div>

            <div className="form-group w-full">
              <div className="relative mt-3 inline-block w-64">
                <span>Category:</span>
                <select
                  defaultValue={category}
                  onChange={handleChangeCategory}
                  className="focus:shadow-outline block w-full appearance-none rounded border-b border-teal-500 bg-white px-4 py-2 pr-8 leading-tight text-gray-500 shadow hover:border-gray-500 focus:outline-none"
                >
                  <option value="trending">Trending</option>
                  <option value="review">Review</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">other</option>
                </select>
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
              <div className="text-red-400 " component="p" name="category"></div>
            </div>

            <div className="form-group mt-3 w-full">
              <div className="border-b border-teal-500 py-1">
                Summary:
                <textarea
                  className={`w-full 
                      appearance-none border-none bg-transparent py-1 leading-tight 
                      text-gray-500 dark:text-gray-400`}
                  type="text"
                  placeholder="Blog summary"
                  aria-label="Summary"
                  defaultValue={postData.frontMatter.summary}
                  onChange={handleChangeSummary}
                  autoComplete="off"
                />
              </div>
              <div className="text-red-400 " component="p">
                {summaryError}
              </div>
            </div>
          </div>
          {/* <input
            className={`w-full 
                      appearance-none border-none bg-transparent py-1 leading-tight 
                      text-gray-500 dark:text-gray-400`}
            type="text"
            placeholder="Blog title"
            aria-label="Title"
            name="title"
            defaultValue={postData.frontMatter.title}
            onChange={handleChangeTitle}
            autoComplete="off"
          /> */}
          {/* <div>{titleError}</div> */}
        </AccordionDetails>
      </Accordion>
      <SunEditor handleChange={handleChangeEditor} editorContent={postData.frontMatter.content} />
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
  return {
    props: { postData: postData !== undefined ? postData : null },
    // revalidate: 1
  }
}
