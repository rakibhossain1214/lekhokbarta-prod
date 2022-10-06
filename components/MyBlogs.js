import React from 'react'
import Image from '@/components/Image'
import Link from 'next/link'

function MyBlogs({ userInfo, userPosts }) {
    
    if (userPosts === null) {
        return <p>Loading...</p>
    }

    if (userPosts.length === 0) {
        return <p>No content found!</p>
    }

    return (
        <div className="w-full">
            <div className='pl-2 pr-2 pt-3 pb-2 text-teal-500'>Contents found: {userPosts.length}</div>
            <table className="m-1 table-auto p-2">
                <tbody>
                    {userPosts
                        .map((post, i) => (
                            <tr key={i} className="border-b border-gray-400">
                                <td className="w-9">
                                        {post.frontMatter.postThumbnail !== undefined && post.frontMatter.postThumbnail !== '' ? (
                                            <Image
                                                src={post.frontMatter.postThumbnail}
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
                                <td className="pl-2 pt-3 pb-3">
                                    <Link href={`/blog/${post.postId}/${post.frontMatter.slug}`}>{post.frontMatter.title}</Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default MyBlogs
