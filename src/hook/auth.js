import { createContext, useContext, useState } from 'react'
import AuthService from '../service/AuthService'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { addUserToDb, getUserInfo } from '@/lib/firestoreConnection'

const authContext = createContext()

export function AuthProvider(props) {
  const [user, setUser] = useState(typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem("userObject")) : null)
  const [error, setError] = useState('')
  const router = useRouter()

  const loginWithGoogleRedirect = async () => {
    const { error, user } = await AuthService.loginWithGoogle()
    const userData = await getUserInfo(user.uid)

    if (userData === 'NODATA') {
      await addUserToDb(user)
      const userInfo = await getUserInfo(user.uid)
      setUser(userInfo ?? null)
      setError(error ?? '')
      router.push('/', undefined, { shallow: false })
    } else {
      setUser(userData ?? null)
      setError(error ?? '')
      router.push('/', undefined, { shallow: false })
    }
  }

  const loginWithGoogleNoRedirect = async () => {
    const { error, user } = await AuthService.loginWithGoogle()
    const userData = await getUserInfo(user.uid)

    if (userData === 'NODATA') {
      await addUserToDb(user)
      const userInfo = await getUserInfo(user.uid)
      setUser(userInfo ?? null)
      setError(error ?? '')
      if(typeof window !== 'undefined'){
        window.localStorage.setItem("userObject", JSON.stringify(userInfo))
      }
      if(typeof window !== 'undefined'){
        Router.reload(window.location.pathname);
      }
    } else {
      setUser(userData ?? null)
      setError(error ?? '')
      if(typeof window !== 'undefined'){
        window.localStorage.setItem("userObject", JSON.stringify(userData))
      }
      if(typeof window !== 'undefined'){
        Router.reload(window.location.pathname);
      }
    }
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
    if(typeof window !== 'undefined'){
      window.localStorage.setItem("userObject", null)
    }
    router.push('/', undefined, { shallow: false })
  }
  const value = { user, error, loginWithGoogleNoRedirect, loginWithGoogleRedirect, logout, setUser }

  return <authContext.Provider value={value} {...props} />
}

export default function useAuth() {
  return useContext(authContext)
}
