import React, { useState } from 'react'
import Image from '@/components/Image'
import { deleteFollower, getUserInfo } from '@/lib/firestoreConnection'

function Followers({ userInfo, handleFollowChange }) {
  const [loading, setLoading] = useState(false)

  const deleteFollow = ({ event, follower }) => {
    event.preventDefault()
    setLoading(true)
    if (userInfo !== null) {
      deleteFollower({ userInfo, user: follower }).then(async () => {
        const userData = await getUserInfo(userInfo.uid)
        handleFollowChange({ userData })
        setLoading(false)
      })
    }
  }

  if (userInfo?.followers.length === 0) {
    return <p>No followers found!</p>
  }

  return (
    <div className="w-full">
      <div className='pl-2 pr-2 pt-3 pb-2 text-teal-500'>Followers: {userInfo?.followers.length}</div>
      <table className="m-1 table-auto p-2">
        <tbody>
          {userInfo?.followers
            ?.slice(0)
            .reverse()
            .map((follower) => (
              <tr key={follower?.uid}>
                <td>
                  <a target="_blank" href={`/profile/${follower?.uid}`}>
                    <Image
                      src={follower?.photoURL}
                      width="32px"
                      height="32px"
                      alt="avatar"
                      className="rounded-full border-none align-middle shadow-lg"
                    />
                  </a>
                </td>
                <td className="pl-2 pb-1">
                  <a target="_blank" href={`/profile/${follower?.uid}`}>
                    {follower?.displayName}
                  </a>
                </td>
                <td className="pl-2">
                  <button
                    disabled={loading}
                    onClick={(event) => deleteFollow({ event, follower })}
                    className="rounded border border-red-400 p-1 text-xs text-red-400"
                  >
                    {loading ? 'Waite...' : 'Remove'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Followers
