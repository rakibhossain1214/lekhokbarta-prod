import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './auth'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()
    if (!auth.user) {
      router.replace('/login')
      return <p>Loading...</p>
    }
    return <Component auth={auth} {...props} />
  }
}
