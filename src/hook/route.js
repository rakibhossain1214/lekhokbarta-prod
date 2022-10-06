import NoPermission from '@/components/NoPermission'
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
    if (!auth.user) {
      return <NoPermission />
    }
    return <Component auth={auth} {...props} />
  }
}
