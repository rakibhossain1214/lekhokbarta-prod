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
      return <h4 className="text-red-500">You don't have permission to visit this page.</h4>
    }
    return <Component auth={auth} {...props} />
  }
}
