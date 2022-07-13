import React from 'react'
import { withPublic } from '../src/hook/route'

function Login({ auth }) {
  // console.log('Auth: ', auth)
  const { user, loginWithGoogleRedirect, error } = auth
  return (
    <div>
      {error && <h1>{error}</h1>}
      <button onClick={loginWithGoogleRedirect}>login</button>
      <h1>{user?.uid}</h1>
    </div>
  )
}

export default withPublic(Login)
