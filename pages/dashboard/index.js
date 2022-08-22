import React, { useEffect, useState } from 'react'
import { withProtected } from 'src/hook/route'
import { getUserInfo, getAllPostsByAuthorId } from '@/lib/firestoreConnection'
// components

import CardLineChart from 'components/Cards/CardLineChart.js'
import CardBarChart from 'components/Cards/CardBarChart.js'
import CardPageVisits from 'components/Cards/CardPageVisits.js'
import CardSocialTraffic from 'components/Cards/CardSocialTraffic.js'

// layout for page

import DashboardLayout from 'layouts/DashboardLayout'

//analytics

import { renderButton, checkSignedIn, signOut } from '../../src/GoogleAnalyticsAuth/authUtils'
import PageviewsReport from 'src/GoogleAnalyticsAuth/PageViewReport'

function Dashboard({ auth }) {
  const { user } = auth
  const [userInfo, setUserInfo] = useState(user)
  const [authorPosts, setAuthorPosts] = useState(user)

  useEffect(() => {
    async function getUser() {
      const userData = await getUserInfo(user.uid)
      setUserInfo(userData)
    }
    getUser()
  }, [])

  useEffect(() => {
    async function getAuthorPosts() {
      const posts = await getAllPostsByAuthorId({ authorId: user.uid })
      setAuthorPosts(posts)
    }
    getAuthorPosts()
  }, [])

  //ANALYTICS
  const [isSignedIn, setIsSignedIn] = useState(false)

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn)
    if (!signedIn) {
      renderButton()
    }
  }

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn)
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    window.gapi.load('auth2', init)
  })

  return (
    <DashboardLayout userInfo={userInfo}>
      {!isSignedIn ? (
        <>
          <div id="signin-button"></div>
        </>
      ) : (
        <>
          <PageviewsReport viewID="273664975" authorPosts={authorPosts} />
          <button onClick={signOut}>SignOut</button>
        </>
      )}
    </DashboardLayout>
  )
}

export default withProtected(Dashboard)
// Dashboard.layout = DashboardLayout;
