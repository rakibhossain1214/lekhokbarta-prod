import React from 'react'
import { createPopper } from '@popperjs/core'
import Image from '@/components/Image'
import Link from 'next/link'
import { withProtected } from 'src/hook/route'

const UserDropdown = ({ userInfo, auth }) => {
  const { logout } = auth

  // console.log(user)

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      >
        <div className="flex items-center">
          <span className="bg-blueGray-200 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm text-white">
            {/* <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user?.photoURL}
            /> */}
            {userInfo !== undefined ? (
              <Image
                src={userInfo !== undefined ? userInfo.photoURL : ''}
                width="35px"
                height="35px"
                alt="avatar"
                className="w-full rounded-full border-none align-middle shadow-lg"
              />
            ) : (
              'no image'
            )}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'min-w-48 z-50 float-left list-none rounded bg-white py-2 text-left text-base shadow-lg'
        }
      >
        {/* <a
          href="/dashboard/profile"
          user={user}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={(e) => e.preventDefault()}
        >
          Profile
        </a> */}

        {/* <Link href="/dashboard/profile"> */}
        <a
          href="#pablo"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
        >
          {/* <i
                      className={
                        "fas fa-tv mr-2 text-sm " 
                      }
                    ></i>{" "} */}
          Profile
        </a>
        {/* </Link> */}

        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a> */}
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        <div className="border-blueGray-100 my-2 h-0 border border-solid" />
        {/* <Link href="#"> */}
        <a
          href="#pablo"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
          onClick={logout}
        >
          {/* <i
                      className={
                        "fas fa-tv mr-2 text-sm " 
                      }
                    ></i>{" "} */}
          Log out
        </a>
        {/* </Link> */}
      </div>
    </>
  )
}

export default withProtected(UserDropdown)
