import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const profileSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(4, 'Name must be 4 characters at minimum')
    .max(50, 'Name must be 50 characters at maximum')
    .required('Name is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  phoneNumber: Yup.string()
    .min(11, 'Must be a phone number. (ex: 017********)')
    .max(11, 'Must be a phone number. (ex: 017********)'),
  occupation: Yup.string()
    .min(3, 'Occupation must be 3 characters at minimum')
    .max(50, 'Occupation must be 50 characters at maximum'),
  company: Yup.string()
    .min(3, 'Company must be 3 characters at minimum')
    .max(50, 'Company must be 50 characters at maximum'),
})

function ProfileDetails({ userInfo, handleChange, userId, user, setUser }) {
  const db = getFirestore()
  const userRef = doc(db, 'users', userInfo.uid)
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{
        displayName: userInfo.displayName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        occupation: userInfo.occupation,
        company: userInfo.company,
        address: userInfo.address,
        city: userInfo.city,
        country: userInfo.country,
      }}
      validationSchema={profileSchema}
      onSubmit={(values) => {
        setEditable(false)
        setLoading(true)
        values.address = values.address !== undefined ? values.address : ''
        values.city = values.city !== undefined ? values.city : ''
        values.phoneNumber = values.phoneNumber !== undefined ? values.phoneNumber : ''
        values.company = values.company !== undefined ? values.company : ''
        values.country = values.country !== undefined ? values.country : ''
        values.occupation = values.occupation !== undefined ? values.occupation : ''
        updateDoc(userRef, { ...values, lastmod: new Date().toString() }).then(() => {
          handleChange(values)
          setUser({ ...userInfo, ...values })
          setLoading(false)
        })
      }}
    >
      {({ touched, errors, values }) => (
        <Form>
          <div className="w-full">
            <div className="flex justify-between">
              <div className="order-last">
                {user !== null
                  ? userId === user.uid && (
                      <button
                        className="mt-3 mr-3 p-1"
                        onClick={(e) => {
                          e.preventDefault()
                          setEditable(!editable)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 rounded-full bg-gray-300 text-teal-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    )
                  : ''}
              </div>
              <div className="mt-4 ml-2 flex flex-col">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {!editable ? (
                    <p className="pl-1">{userInfo.displayName}</p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.displayName && errors.displayName
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="Name"
                          aria-label="Name"
                          name="displayName"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="displayName" />
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {!editable ? (
                    <p className="pl-1">{values.email}</p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100 ${
                                                          editable ? 'bg-gray-400' : ''
                                                        }
                                                        ${
                                                          touched.email && errors.email
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="Email"
                          aria-label="Email"
                          name="email"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="email" />
                    </div>
                  )}
                </div>

                {user !== null ? (
                  user.uid === userId ? (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {!editable ? (
                        <p className="pl-1">
                          {userInfo.phoneNumber !== ''
                            ? userInfo.phoneNumber
                            : 'no phone number added'}
                        </p>
                      ) : (
                        <div className="form-group">
                          <div className="border-b border-teal-500">
                            <Field
                              className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.phoneNumber && errors.phoneNumber
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                              type="text"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              name="phoneNumber"
                              autoComplete="off"
                            />
                          </div>
                          <ErrorMessage
                            className="text-red-400 "
                            component="p"
                            name="phoneNumber"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  {!editable ? (
                    <p className="pl-1">
                      {userInfo.occupation !== '' ? userInfo.occupation : 'no occupation added'}
                    </p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.occupation && errors.occupation
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="Occupation"
                          aria-label="Occupation"
                          name="occupation"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="occupation" />
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>

                  {!editable ? (
                    <p className="pl-1">
                      {userInfo.company !== '' ? userInfo.company : 'no company/instituition added'}
                    </p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.company && errors.company
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="Company"
                          aria-label="Company"
                          name="company"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="company" />
                    </div>
                  )}
                </div>

                {user !== null ? (
                  user.uid === userId ? (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>

                      {!editable ? (
                        <p className="pl-1">
                          {userInfo.address !== '' ? userInfo.address : 'no address added'}
                        </p>
                      ) : (
                        <div className="form-group">
                          <div className="border-b border-teal-500">
                            <Field
                              className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.address && errors.address
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                              type="text"
                              placeholder="Address"
                              aria-label="Address"
                              name="address"
                              autoComplete="off"
                            />
                          </div>
                          <ErrorMessage className="text-red-400 " component="p" name="address" />
                        </div>
                      )}
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {!editable ? (
                    <p className="pl-1">{userInfo.city !== '' ? userInfo.city : 'no city added'}</p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.city && errors.city
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="City"
                          aria-label="City"
                          name="city"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="city" />
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {!editable ? (
                    <p className="pl-1">
                      {userInfo.country !== '' ? userInfo.country : 'no country added'}
                    </p>
                  ) : (
                    <div className="form-group">
                      <div className="border-b border-teal-500">
                        <Field
                          className={`focus:outline-none} w-full 
                                                        appearance-none border-none bg-transparent py-2 leading-tight 
                                                        text-gray-600 dark:text-gray-100
                                                        ${
                                                          touched.country && errors.country
                                                            ? 'is-invalid'
                                                            : ''
                                                        }
                                                        `}
                          type="text"
                          placeholder="Country"
                          aria-label="Country"
                          name="country"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage className="text-red-400 " component="p" name="country" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {loading ? <p className="p-1 text-red-400">Please waite...</p> : ''}
            <div className="mt-4 pb-4 pr-2">
              {editable && (
                <div className="flex justify-end">
                  <div className="text-base font-medium leading-6">
                    <button
                      type="submit"
                      className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                    >
                      Update
                    </button>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setEditable(false)
                      }}
                      className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-red-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileDetails
