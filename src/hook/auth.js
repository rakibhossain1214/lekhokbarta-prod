import { createContext, useContext, useState } from 'react'
import AuthService from '../service/AuthService'
import { useRouter } from 'next/router'

const authContext = createContext()

export function AuthProvider(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()
  const loginWithGoogleRedirect = async () => {
    const { error, user } = await AuthService.loginWithGoogle()
    setUser(user ?? null)
    setError(error ?? '')
    router.replace('/')
  }

  const loginWithGoogleNoRedirect = async () => {
    const { error, user } = await AuthService.loginWithGoogle()
    setUser(user ?? null)
    setError(error ?? '')
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
    router.replace('/')
  }
  const value = { user, error, loginWithGoogleNoRedirect, loginWithGoogleRedirect, logout, setUser }

  return <authContext.Provider value={value} {...props} />
}

export default function useAuth() {
  return useContext(authContext)
}
