import LoadingComponent from '@/components/LoadingComponent'
import { getUserInfo } from '@/lib/firestoreConnection'
import React, { useEffect, useState } from 'react'
import useAuth from '../hook/auth'
import AuthService from '../service/AuthService'

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const AuthState = AuthService.waitForUser((userCred) => {
      // setUser(userCred)
      if (userCred !== null) {
        getUserInfo(userCred?.uid).then((data) => {
          if (data !== 'NODATA') {
            if(typeof window !== 'undefined'){
              window.localStorage.setItem("userObject", JSON.stringify(data))
            }
            setUser(data) 
          }
        })
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
    return AuthState
  }, [])


  return children
}