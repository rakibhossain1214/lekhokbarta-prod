import LoadingComponent from '@/components/LoadingComponent'
import { getUserInfo } from '@/lib/firestoreConnection'
import React, { useEffect, useState } from 'react'
import useAuth from '../hook/auth'
import AuthService from '../service/AuthService'

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth()
  useEffect(() => {
    const AuthState = AuthService.waitForUser((userCred) => {
      setUser(userCred)
      if (userCred !== null) {
        getUserInfo(userCred?.uid).then((data) => {
          if (data !== 'NODATA') {
            setUser(data)
          } else {
            setUser(userCred)
          }
        })
      } 
    })
    return AuthState
  }, [])

  return children
}
