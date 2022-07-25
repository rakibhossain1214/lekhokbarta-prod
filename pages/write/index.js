import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withProtected } from '../../src/hook/route'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Router, { useRouter } from 'next/router'
import { addPost, getUserInfo } from '@/lib/firestoreConnection'

const LoginSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be 5 characters at minimum')
    .max(100, 'Title must be 100 characters at maximum')
    .required('Blog title is required'),
  category: Yup.string().required('Category is required'),
})

function Write({ auth }) {
  const { user, loginWithGoogleRedirect, error } = auth

  const [author, setAuthor] = useState(null)

  useEffect(() => {
    getUserInfo(user.uid).then((data) => {
      setAuthor(data)
    })
  }, [])

  const router = useRouter()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Write
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Start writing a blog &rarr; title and category
        </p>
      </div>
      <Grid
        className="py-2"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Formik
          initialValues={{ title: '', category: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            addPost({ values: { ...values, category: [values.category] }, author })
              .then(function (docRef) {
                router.push(`write/${user.uid}/${docRef.id}`)
              })
              .catch(function (error) {
                console.error('Error adding document: ', error)
              })
          }}
        >
          {({ touched, errors, isSubmitting, values }) =>
            !isSubmitting ? (
              <Form className="mt-5 w-full max-w-lg">
                <div className="form-group">
                  <div className="border-b border-teal-500 py-1">
                    <Field
                      className={`focus:outline-none} w-full 
                      appearance-none border-none bg-transparent py-1 leading-tight 
                      text-gray-500 dark:text-gray-400
                      ${touched.title && errors.title ? 'is-invalid' : ''}
                      `}
                      type="text"
                      placeholder="Blog title"
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
                      className="focus:shadow-outline block w-full appearance-none rounded border-b border-teal-500 bg-white px-4 py-2 pr-8 leading-tight text-gray-500 shadow hover:border-gray-500 focus:outline-none dark:bg-black dark:text-gray-400"
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

                <div className="flex justify-end text-base font-medium leading-6">
                  <button
                    className="mt-5 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    type="submit"
                  >
                    Next &rarr;
                  </button>
                </div>
              </Form>
            ) : (
              <div>
                <h1 className="mt-5 p-3">Form Submitted</h1>
                <div className="alert alert-success mt-3">
                  Thank for your connecting with us. Here's what we got from you !
                </div>
              </div>
            )
          }
        </Formik>
      </Grid>
    </div>
  )
}

export default withProtected(Write)
