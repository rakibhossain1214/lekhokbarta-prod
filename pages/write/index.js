import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withProtected } from '../../src/hook/route'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { addPost, getAllTagsArray, getUserInfo } from '@/lib/firestoreConnection'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import CreatableSelect from 'react-select/creatable'
import WriteAgreement from '@/components/WriteAgreement'
import kebabCase from '@/lib/utils/kebabCase'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

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

function Write({ auth }) {
  const { user } = auth

  const [tagsOptions, setTagsOptions] = useState([])

  const [author, setAuthor] = useState(null)

  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    getUserInfo(user.uid).then((data) => {
      setAuthor(data)
    })
  }, [])

  useEffect(() => {
    async function GetTagsOptions() {
      const options = await getAllTagsArray()
      setTagsOptions(options)
    }
    return GetTagsOptions()
  }, [])

  const router = useRouter()

  const handleChange = (newValue) => {
    let tagArray = []
    newValue.map((node) => {
      tagArray.push({
        label: kebabCase(node.label.toLowerCase()),
        value: kebabCase(node.value.toLowerCase()),
      })
    })
    setSelectedTags(tagArray)
  }

  if (user.userRole === 'regular') {
    return (
      <>
        <div className="mt-24 text-center">
          <PageTitle>
            You dont have permission to write blogs!{' '}
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
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Write
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Tips: Following fields are important for your SEO ranking.
          </p>
        </div>
        <WriteAgreement />
        <Grid
          className="py-2"
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Formik
            initialValues={{ title: '', category: '', summary: '' }}
            validationSchema={postValidationSchema}
            onSubmit={(values) => {
              if (author !== null) {
                addPost({
                  values: { ...values, category: values.category.toLowerCase() },
                  author,
                  selectedTags,
                })
                  .then(function (docRef) {
                    router.push(`write/${user.uid}/${docRef.id}`)
                  })
                  .catch(function (error) {
                    console.error('Error adding document: ', error)
                  })
              } else {
                setAuthor('NODATA')
              }
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
              !isSubmitting ? (
                <Form className="mt-5 w-full max-w-lg">
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
                      className="mt-5 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      type="submit"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </Form>
              ) : author === 'NODATA' ? (
                <div className="mt-24 text-center">
                  <PageTitle>
                    Something went wrong!{' '}
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
              ) : (
                <div>
                  <h1 className="mt-5 p-3">Please wait...</h1>
                </div>
              )
            }
          </Formik>
        </Grid>
      </div>
    </>
  )
}

export default withProtected(Write)
