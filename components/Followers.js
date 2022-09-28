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
      <table className="m-4 table-auto p-4">
        <tbody>
          {userInfo?.followers
            ?.slice(0)
            .reverse()
            .map((follower) => (
              <tr key={follower?.uid}>
                <td>
                  <Image
                    src={follower?.photoURL}
                    width="32px"
                    height="32px"
                    alt="avatar"
                    className="rounded-full border-none align-middle shadow-lg"
                  />
                </td>
                <td className="pl-2 pb-1">{follower?.displayName}</td>
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
