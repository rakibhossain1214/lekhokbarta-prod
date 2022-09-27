import React, { useEffect, useState } from 'react';
import Image from '@/components/Image';
import { getUserInfo, RemoveFavoriteBlogs } from '@/lib/firestoreConnection';
import Link from 'next/link';

function FavBlogs({ userInfo, handleFollowChange, userId }) {

    const handleRemoveFavoriteBlogs = (e, postId, title, slug, postThumbnail, authorName, authorId, authorAvatar) => {
        e.preventDefault()
        // setProcessing(true)
    
        let favList = []
        userInfo.favoriteBlogs.map((item) => {
          if (item.postId !== postId) {
            favList.push(item)
          }
        })
    
        userInfo.favoriteBlogs = favList
    
        RemoveFavoriteBlogs({ 
          postId,
          title,
          slug,
          postThumbnail,
          authorName,
          authorId,
          authorAvatar,
          user: userInfo
         })
         .then(async () => {
            const userData = await getUserInfo(userId)
            handleFollowChange({ userData })
        })
      }

    return (
        <div className='w-full'>
            <table className="table-auto p-4 m-4">
                <tbody>
                    {userInfo.favoriteBlogs.map((post) => (
                        
                        <tr key={post.postId} className="border-b border-gray-400">
                            <td className='w-9'>
                                { post.postThumbnail !== undefined && post.postThumbnail !== "" ?
                                    <Image
                                        src={post?.postThumbnail}
                                        width="32px"
                                        height="32px"
                                        alt="postThumbnail"
                                        className="rounded-full border-none align-middle shadow-lg"
                                    /> : 
                                    <Image
                                        src={'/static/images/blogging.png'}
                                        width="32px"
                                        height="32px"
                                        alt="postThumbnail"
                                        className="rounded-full border-none align-middle shadow-lg"
                                    /> 
                                }
                            </td>
                            <td className='pl-2 pt-4 pb-4'>
                                <Link href={`/blog/${post.postId}/${post.slug}`}>
                                   {post.title}
                                </Link> <span className='text-xs'>by</span> 
                                <Link href={`/blog/${post.postId}/${post.slug}`}>
                                   <span className="text-blue-500 text-xs">{" "+post.authorName}</span>
                                </Link>
                            </td>
                            <td className='pl-2'>
                                <button
                                onClick={(e) => handleRemoveFavoriteBlogs(e, post.postId, post.title, post.slug, post.postThumbnail, post.authorName, post.authorId, post.authorAvatar)}
                                className='border border-red-400 p-1 rounded text-xs text-red-400'>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}

export default FavBlogs