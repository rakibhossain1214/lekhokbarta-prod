import React, { useState } from 'react';
import Image from '@/components/Image';
import { deleteFollower, deleteFollowing, getUserInfo } from '@/lib/firestoreConnection';

function Followers({ userInfo, userId, handleFollowChange, setUser }) {
    const [loading, setLoading] = useState(false)

    const deleteFollow = ({ event, follower }) => {
        event.preventDefault();
        deleteFollower({ userId, user: follower })
        deleteFollowing({ userId, user: follower }).then(async () => {
            const userData = await getUserInfo(userId)
            handleFollowChange({userData});
            setUser(userData)
            setLoading(false)
        })
    }

    if(userInfo?.followers.length === 0){
        return <p>No followers found!</p>
    }

    return (
        <div className='w-full'>
            <table className="table-auto p-4 m-4">
                <tbody>
                    {userInfo?.followers?.map((follower) => (
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
                            <td className='pl-2 pb-1'>
                                {follower?.displayName}
                            </td>
                            <td className='pl-2'>
                                <button
                                disabled={loading}
                                onClick={(event) => deleteFollow({event, follower })}
                                className='border border-red-400 p-1 rounded text-xs text-red-400'>
                                    { loading ? "Please waite..." : "Remove"}
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default Followers