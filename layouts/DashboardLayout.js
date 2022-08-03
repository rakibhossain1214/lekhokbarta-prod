import React from 'react'

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import HeaderStats from 'components/Headers/HeaderStats.js'

export default function DashboardLayout({ children, userInfo }) {
  return (
    <>
      <Sidebar userInfo={userInfo} />
      <div className="bg-blueGray-100 relative md:ml-64">
        <AdminNavbar userInfo={userInfo} />
        {/* Header */}
        <HeaderStats />
        <div className="-m-24 mx-auto w-full px-4 md:px-10">{children}</div>
      </div>
    </>
  )
}
