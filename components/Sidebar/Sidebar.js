import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CustomNavDropdown from '@/components/Dropdowns/CustomNavDropdown'

import Image from '@/components/Image'

export default function Sidebar({ userInfo }) {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const router = useRouter()
  return (
    <>
      <nav className="relative z-50 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */}
          <button
            className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="text-blue-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-md font-bold uppercase md:block md:pb-2"
            >
              &larr; Lekhokbarta
            </a>
          </Link>
          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block">{/* <NotificationDropdown /> */}</li>
            <li className="relative inline-block">
              <CustomNavDropdown userInfo={userInfo} />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="text-blue-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                    >
                      &larr; Lekhokbarta
                    </a>
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-10 flex-none">
                {userInfo !== undefined ? (
                  <Image
                    src={userInfo !== undefined ? userInfo.photoURL : ''}
                    width="35px"
                    height="35px"
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  'no image'
                )}
              </div>
              <div>
                <div className="flex items-center py-2">
                  <p className="text-sm">{userInfo.displayName}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              Publisher Section
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/dashboard">
                  <a
                    href="#pablo"
                    className={
                      'block py-3 text-xs font-bold uppercase ' +
                      (router.pathname.indexOf('/admin/dashboard') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/dashboard') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Dashboard
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/settings">
                  <a
                    href="#pablo"
                    className={
                      'block py-3 text-xs font-bold uppercase ' +
                      (router.pathname.indexOf('/admin/settings') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-tools mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/settings') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    My Blogs
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/maps">
                  <a
                    href="#pablo"
                    className={
                      'block py-3 text-xs font-bold uppercase ' +
                      (router.pathname.indexOf('/admin/maps') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/maps') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Followers
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/tables">
                  <a
                    href="#pablo"
                    className={
                      'block py-3 text-xs font-bold uppercase ' +
                      (router.pathname.indexOf('/admin/tables') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-table mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/tables') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Earnings
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/maps">
                  <a
                    href="#pablo"
                    className={
                      'block py-3 text-xs font-bold uppercase ' +
                      (router.pathname.indexOf('/admin/maps') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/maps') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Trx History
                  </a>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              Advertiser Secion
            </h6>
            {/* Navigation */}
            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/auth/login">
                  <a
                    href="#pablo"
                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                  >
                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i> Overview
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <a
                  href="#pablo"
                  className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                >
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i> Other
                </a>
              </li>
            </ul>
 
          </div>
        </div>
      </nav>
    </>
  )
}
