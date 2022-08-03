import React from 'react'
import CustomNavDropdown from '@/components/Dropdowns/CustomNavDropdown'

export default function Navbar({ userInfo }) {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent p-4 md:flex-row md:flex-nowrap md:justify-start">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
          {/* Brand */}
          <a
            className="pt-4 pb-4 text-sm font-semibold uppercase text-gray-500 lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          <ul className="hidden list-none flex-col items-center md:flex md:flex-row">
            <CustomNavDropdown userInfo={userInfo} />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  )
}
