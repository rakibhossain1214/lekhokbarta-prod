import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


export default function WithdrawModal({ balance }) {
    const [showModal, setShowModal] = useState(false)

    const LoginSchema = Yup.object().shape({
        amount: Yup.number()
            .min(100, 'Amount must be 100 tk at minimum')
            .max(balance, `Amount must be ${balance} tk at maximum`)
            .required('Withdraw amount is required'),
        type: Yup.string().required('Account type is required'),
        gateway: Yup.string().required('Gateway type is required'),
        accountNo: Yup.string()
            .required('Account number is required')
            .min(11, 'Account number must be 11 characters at minimum')
            .max(11, 'Account number must be 11 characters at maximum'),
    })

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <button onClick={() => setShowModal(true)} className="inline-flex items-center text-teal-600 hover:underline">
                        Withdraw Money &rarr;
                    </button>
                </div>
            </Menu>

            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative my-6 mx-6 w-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative  flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                                    <h3 className="text-3xl font-semibold dark:text-slate-300">Withdraw Money</h3>
                                </div>

                                <Formik
                                    initialValues={{ amount: 100, type: '', gateway: '', accountNo: '' }}
                                    validationSchema={LoginSchema}
                                    onSubmit={(values) => {
                                        console.log(values)
                                    }}
                                >
                                    {({ touched, errors, isSubmitting, values }) =>
                                        !isSubmitting ? (
                                            <Form className="relative flex-auto p-6">

                                                <div className="form-group">
                                                    <div className="border-b border-teal-500 py-1">
                                                        <Field
                                                            className={`focus:outline-none w-full 
                                                            appearance-none border-none bg-transparent py-2 leading-tight 
                                                            text-gray-600 dark:bg-white
                                                            ${touched.amount && errors.amount ? 'is-invalid' : ''}
                                                            `}
                                                            type="text"
                                                            placeholder="Withdrawal amount"
                                                            aria-label="Amount"
                                                            name="amount"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <ErrorMessage className="text-red-400 " component="p" name="amount" />
                                                </div>


                                                <div className="form-group">
                                                    <div className="relative mt-5 inline-block w-full">
                                                        <Field
                                                            as="select"
                                                            name="type"
                                                            className="focus:shadow-outline block w-full appearance-none rounded border-b border-teal-500 bg-white px-4 py-2 pr-8 leading-tight text-gray-500 shadow hover:border-gray-500 focus:outline-none"
                                                        >
                                                            <option value="">Select account type</option>
                                                            <option value="personal">Personal</option>
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
                                                    <ErrorMessage className="text-red-400 " component="p" name="type" />
                                                </div>

                                                <div className="form-group">
                                                    <div className="relative mt-5 inline-block w-full">
                                                        <Field
                                                            as="select"
                                                            name="gateway"
                                                            className="focus:shadow-outline block w-full appearance-none rounded border-b border-teal-500 bg-white px-4 py-2 pr-8 leading-tight text-gray-500 shadow hover:border-gray-500 focus:outline-none"
                                                        >
                                                            <option value="">Select payment gateway</option>
                                                            <option value="bkash">Bkash</option>
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
                                                    <ErrorMessage className="text-red-400 " component="p" name="gateway" />
                                                </div>

                                                <div className="form-group">
                                                    <div className="border-b mt-5 border-teal-500 py-1">
                                                        <Field
                                                            className={`focus:outline-none w-full 
                                                            appearance-none border-none bg-transparent py-2 leading-tight 
                                                            text-gray-600 dark:bg-white
                                                            ${touched.accountNo && errors.accountNo ? 'is-invalid' : ''}
                                                            `}
                                                            type="text"
                                                            placeholder="Account Number"
                                                            aria-label="Account Number"
                                                            name="accountNo"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <ErrorMessage className="text-red-400 " component="p" name="accountNo" />
                                                </div>

                                                <div className="flex items-center justify-end rounded-b p-6 mt-10">
                                                    <button
                                                        className="mr-1 mb-1 bg-teal-500 px-6 py-2 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                                                        type="submit"
                                                    >
                                                        Yes, I'm sure
                                                    </button>
                                                    <button
                                                        className="mr-1 mb-1 rounded bg-red-500 px-6 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        No, cancel
                                                    </button>
                                                </div>

                                            </Form>
                                        )
                                            :
                                            (
                                                <div>
                                                    <div className="relative flex-auto p-6">
                                                        <p className="my-4 text-lg leading-relaxed text-slate-500 dark:text-slate-300">
                                                            Thank you for your withdrawal request. We will verify your request and send money to your accout within 24 hours.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-end rounded-b p-6">
                                                        <button
                                                            className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    )
}
