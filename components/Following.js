import React, { useState } from 'react'
import Image from '@/components/Image'
import { deleteFollower, getUserInfo } from '@/lib/firestoreConnection'

function Following({ userInfo, handleFollowChange }) {
  const [loading, setLoading] = useState(false)

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
      <div className='pl-2 pr-2 pt-3 pb-2 text-teal-500'>Following: {userInfo?.following.length}</div>
      <table className="m-1 table-auto p-2">
        <tbody>
          {userInfo?.following
            ?.slice(0)
            .reverse()
            .map((following) => (
              <tr key={following?.uid}>
                <td>
                  <a target="_blank" href={`/profile/${following?.uid}`}>
                    <Image
                      src={following?.photoURL}
                      width="32px"
                      height="32px"
                      alt="avatar"
                      className="rounded-full border-none align-middle shadow-lg"
                    />
                  </a>
                </td>
                <td className="pl-2 pb-1">
                  <a target="_blank" href={`/profile/${following?.uid}`}>
                    {following?.displayName}
                  </a>
                </td>
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
