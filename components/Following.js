import React, { useState } from 'react'
import Image from '@/components/Image'
import { deleteFollower, deleteFollowing, getUserInfo } from '@/lib/firestoreConnection'

function Following({ userInfo, userId, handleFollowChange, setUser }) {
  const [loading, setLoading] = useState(false)

  // const handleDeleteFollowing = ({ event, following }) => {
  //   event.preventDefault()
  //   setLoading(true)
  //   deleteFollower({ userId: following.uid, user: userInfo })
  //   deleteFollowing({ userId: following.uid, user: userInfo }).then(async () => {
  //     const userData = await getUserInfo(userId)
  //     handleFollowChange({ userData })
  //     setUser(userData)
  //     setLoading(false)
  //   })
  // }

  const handleDeleteFollowing = ({ event, following }) => {
    event.preventDefault()
    setLoading(true)
    if (userInfo !== null) {
      deleteFollower({ userInfo: following, user: userInfo }).then(async () => {
        const userData = await getUserInfo(userInfo.uid)
        handleFollowChange({ userData })
        setLoading(false)
      })
    }
  }

  if (userInfo?.following.length === 0) {
    return <p>You are not following anyone!</p>
  }

  return (
    <div className="w-full">
      <table className="m-4 table-auto p-4">
        <tbody>
          {userInfo?.following
            ?.slice(0)
            .reverse()
            .map((following) => (
              <tr key={following?.uid}>
                <td>
                  <Image
                    src={following?.photoURL}
                    width="32px"
                    height="32px"
                    alt="avatar"
                    className="rounded-full border-none align-middle shadow-lg"
                  />
                </td>
                <td className="pl-2 pb-1">{following?.displayName}</td>
                <td className="pl-2">
                  <button
                    disabled={loading}
                    onClick={(event) => handleDeleteFollowing({ event, following })}
                    className="rounded border border-red-400 p-1 text-xs text-red-400"
                  >
                    {loading ? 'Waite...' : 'Unfollow'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Following
