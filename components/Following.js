import React from 'react'
import Image from '@/components/Image'
import { deleteFollower, deleteFollowing, getUserInfo } from '@/lib/firestoreConnection'

function Following({ userInfo, userId, handleFollowChange }) {
  const handleDeleteFollowing = ({ event, following }) => {
    event.preventDefault()
    deleteFollower({ userId: following.uid, user: userInfo })
    deleteFollowing({ userId: following.uid, user: userInfo }).then(async () => {
      const userData = await getUserInfo(userId)
      handleFollowChange({ userData })
    })
  }

  return (
    <div className="w-full">
      <table className="m-4 table-auto p-4">
        <tbody>
          {userInfo?.following?.map((following) => (
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
                  onClick={(event) => handleDeleteFollowing({ event, following })}
                  className="rounded border border-red-400 p-1 text-xs text-red-400"
                >
                  Unfollow
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
