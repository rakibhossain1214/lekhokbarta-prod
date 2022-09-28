import React, { useEffect, useState } from 'react'
import Image from '@/components/Image'
import { getUserInfo, RemoveFavoriteBlogs } from '@/lib/firestoreConnection'
import Link from 'next/link'

function FavBlogs({ userInfo, handleFollowChange, userId, setUser }) {
  const [loading, setLoading] = useState(false)

  const handleRemoveFavoriteBlogs = (
    e,
    postId,
    title,
    slug,
    postThumbnail,
    authorName,
    authorId,
    authorAvatar
  ) => {
    e.preventDefault()
    // setProcessing(true)
    setLoading(true)
    // let favList = []
    // userInfo.favoriteBlogs.map((item) => {
    //   if (item.postId !== postId) {
    //     favList.push(item)
    //   }
    // })

    // userInfo.favoriteBlogs = favList

    RemoveFavoriteBlogs({
      postId,
      title,
      slug,
      postThumbnail,
      authorName,
      authorId,
      authorAvatar,
      user: userInfo,
    }).then(async () => {
      const userData = await getUserInfo(userId)
      handleFollowChange({ userData })
      setUser(userData)
      setLoading(false)
    })
  }

  if (userInfo?.favoriteBlogs.length === 0) {
    return <p>You don't have any favorite blog!</p>
  }

  return (
    <div className="w-full">
      <table className="m-4 table-auto p-4">
        <tbody>
          {userInfo.favoriteBlogs
            .slice(0)
            .reverse()
            .map((post) => (
              <tr key={post.postId} className="border-b border-gray-400">
                <td className="w-9">
                  {post.postThumbnail !== undefined && post.postThumbnail !== '' ? (
                    <Image
                      src={post?.postThumbnail}
                      width="32px"
                      height="32px"
                      alt="postThumbnail"
                      className="rounded-full border-none align-middle shadow-lg"
                    />
                  ) : (
                    <Image
                      src={'/static/images/blogging.png'}
                      width="32px"
                      height="32px"
                      alt="postThumbnail"
                      className="rounded-full border-none align-middle shadow-lg"
                    />
                  )}
                </td>
                <td className="pl-2 pt-4 pb-4">
                  <Link href={`/blog/${post.postId}/${post.slug}`}>{post.title}</Link>{' '}
                  <span className="text-xs">by</span>
                  <Link href={`/blog/${post.postId}/${post.slug}`}>
                    <span className="text-xs text-blue-500">{' ' + post.authorName}</span>
                  </Link>
                </td>
                <td className="pl-2">
                  <button
                    disabled={loading}
                    onClick={(e) =>
                      handleRemoveFavoriteBlogs(
                        e,
                        post.postId,
                        post.title,
                        post.slug,
                        post.postThumbnail,
                        post.authorName,
                        post.authorId,
                        post.authorAvatar
                      )
                    }
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

export default FavBlogs
