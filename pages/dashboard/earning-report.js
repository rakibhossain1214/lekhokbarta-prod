import React, { useEffect, useState } from 'react'
import { withProtected } from 'src/hook/route'
import { getUserInfo, getAllPostsByAuthorId } from '@/lib/firestoreConnection'
// components

// layout for page
import DashboardLayout from 'layouts/DashboardLayout'

//analytics
import { renderButton, checkSignedIn } from '../../src/GoogleAnalyticsAuth/authUtils'
import PageviewsReport from 'src/GoogleAnalyticsAuth/PageViewReport'
import WithdrawModal from '@/components/modals/WithdrawModal'

function Dashboard({ auth }) {
  const { user } = auth
  const [userInfo, setUserInfo] = useState(user)
  const [authorPosts, setAuthorPosts] = useState(user)
  const [totalEarning, setTotalEarning] = useState(0)

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

  // const init = () => {
  //   checkSignedIn()
  //     .then((signedIn) => {
  //       updateSignin(signedIn)
  //       window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

  useEffect(() => {
    // window.gapi.load('auth2', init)
    const init = () => {
      checkSignedIn()
        .then((signedIn) => {
          updateSignin(signedIn)
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin)
        })
        .catch((error) => {
          console.error(error)
          window.location.reload()
        })
    }
    init()
  }, [])

  const handleTotalEarning = (earning) => {
    setTotalEarning(earning)
  }

  return (
    <>
    <DashboardLayout userInfo={userInfo}>
      {!isSignedIn ? (
        <>
          <p className='p-2'>Signin to Google Analytics to see your earning report</p>
          <div className='p-2' id="signin-button"></div>
        </>
      ) : (
        <>
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-5">
            <div className='flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
              </svg>
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-600 dark:text-white">Account Balance: {totalEarning} Taka</h5>
              </a>
            </div>

            <p className="font-normal text-gray-500 dark:text-gray-400">Total Earning: {totalEarning}</p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Total Withdraw: <span className='line-through'>0 taka</span></p>
            { totalEarning <= 100 ? 
              <WithdrawModal balance={300} /> 
              : 
              <h4 className='text-red-500'>Minimum withdrawal amount: 100 tk</h4>
            }
          </div>
          <PageviewsReport viewID="273664975" authorPosts={authorPosts} handleTotalEarning={handleTotalEarning} />
          <h4 className='p-2 mt-5'>***All views are calculated automatically from google analytics.</h4>
        </>
      )}
    </DashboardLayout>
    
    </>
  )
}

export default withProtected(Dashboard)
