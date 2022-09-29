import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from '../Image'

function CustomNavDropdown({ userInfo, logout }) {
  return (
    <Menu as="div" className="relative ml-3 mr-2 inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md">
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border-gray-500 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:bg-gray-800">
          <div className="py-1">
              <a href='/write' className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                Write
              </a>
            <hr />
            { userInfo !== null ?
                <a href={`/profile/${userInfo.uid}`} className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                  Profile
                </a>
              :
              ''
            }
            <hr />
            <button onClick={logout}>
                <a className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                  Logout
                </a>
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CustomNavDropdown
