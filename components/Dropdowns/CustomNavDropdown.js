/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from '../Image'
import Link from 'next/link'
import { withProtected } from 'src/hook/route'

function CustomNavDropdown({ userInfo, auth }) {
  const { logout } = auth
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {userInfo !== null ? (
            <Image
              src={userInfo.photoURL}
              width="35px"
              height="35px"
              alt="avatar"
              className="w-full rounded-full border-none align-middle shadow-lg"
            />
          ) : (
            'User Menu'
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link href="/dashboard/profile">
              <a href="#" className="block px-4 py-2 text-sm text-gray-900">
                Profile
              </a>
            </Link>
            <hr />
            <Menu.Item>
              <a href="#" className="block px-4 py-2 text-sm text-gray-900" onClick={logout}>
                Log out
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default withProtected(CustomNavDropdown)
