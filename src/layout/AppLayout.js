import { useRouter } from 'next/dist/client/router'
import React from 'react'

export default function AppLayout({ children }) {
  // const router = useRouter()

  // if (router.pathname !== '/login') {
  //   return <main>{children}</main>
  // } else {
  //   return <main>{children}</main>
  // }
  return <main>{children}</main>
}
