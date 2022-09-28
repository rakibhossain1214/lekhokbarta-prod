import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function LoginModal({ handleLoginModal, loginWithGoogleNoRedirect }) {

    const handleLogin = () => {
        handleLoginModal()
        loginWithGoogleNoRedirect()
    }

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                    <div className="relative my-6 mx-6 h-auto w-auto max-w-4xl">
                        {/*content*/}
                        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                            {/*header*/}
                            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                                <h3 className="text-3xl font-semibold dark:text-slate-300">
                                    Login/sign up to Roarspot
                                </h3>
                                <button
                                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                                // onClick={() => setShowModal(false)}
                                >
                                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto p-6">
                                <h4>
                                    Login/Sign up to Roarspot to unlock more features. You are just one click away!
                                </h4>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end rounded-b p-6">
                                <button
                                    className="mb-1 mr-2"
                                    type="button"
                                    onClick={handleLogin}
                                >
                                    <Image
                                     src={'/static/images/google_sign_in.png'}
                                     width={200}
                                     height={50}
                                     />
                                </button>

                                <button
                                    className="mr-1 mb-1 bg-red-500 px-6 py-2 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                                    type="button"
                                    onClick={handleLoginModal}
                                >
                                    No, cancel
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </div>
        </>
    )
}

export default LoginModal
