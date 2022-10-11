import React, { useState } from 'react'
import Image from '@/components/Image'
import { getUserInfo, RemoveFavoriteBlogs } from '@/lib/firestoreConnection'
import Link from 'next/link'
import { getAllPostsFrontMatterWithPostId } from '../lib/firestoreConnection'
import { useEffect } from 'react'

function FavBlogs({ userInfo, handleFollowChange, userId, setUser }) {
  const [loading, setLoading] = useState(false)
  const [favoriteBlogs, setFavoriteBlogs] = useState([])

  const handleRemoveFavoriteBlogs = (
    e,
    postId
  ) => {
    e.preventDefault()
    setLoading(true)

    RemoveFavoriteBlogs({
      postId,
      user: userInfo
    }).then(async () => {
      const userData = await getUserInfo(userId)
      handleFollowChange({ userData })
      setUser(userData)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("userObject", JSON.stringify(userData))
      }
      setLoading(false)
    })
  }

  useEffect(async () => {
    const posts = await getAllPostsFrontMatterWithPostId()
    setFavoriteBlogs(posts)
  }, [])


  if (userInfo?.favoriteBlogs.length === 0) {
    return <p>You don't have any favorite blog!</p>
  }

  if (favoriteBlogs.length < 1) {
    return <>loading...</>
  }

  return (
    <div className="w-full">
      <div className="pl-2 pr-2 pt-3 pb-2 text-teal-500">
        Favorite Blogs: {userInfo?.favoriteBlogs.length}
      </div>
      <table className="m-1 table-auto p-2">
        <tbody>
          {favoriteBlogs
            .map((post) => (
              !post.draft && userInfo.favoriteBlogs.find((x) => x.postId === post.postId) && (
                <tr key={post.postId} className="border-b border-gray-400">
                  <td className="w-9">
                    <Link href={`/blog/${post.postId}/${post.slug}`}>
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
                    </Link>
                  </td>
                  <td className="pl-2 pt-4 pb-4">
                    <Link href={`/blog/${post.postId}/${post.slug}`}>{post.title}</Link>{' '}
                    <span className="text-xs">by</span>
                    <a target="_blank" href={`/profile/${post.authorDetails.id}`} rel="noreferrer">
                      <span className="text-xs text-blue-500">{' ' + post.authorDetails.name}</span>
                    </a>
                  </td>
                  <td className="pl-2">
                    <button
                      disabled={loading}
                      onClick={(e) =>
                        handleRemoveFavoriteBlogs(
                          e,
                          post.postId
                        )
                      }
                      className="rounded border border-red-400 p-1 text-xs text-red-400"
                    >
                      {loading ? 'Waite...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              )
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default FavBlogs
