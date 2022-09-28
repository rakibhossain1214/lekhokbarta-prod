import React, { useEffect, useState } from 'react'
import Image from '@/components/Image'
import { getAllPostsByAuthorId } from '@/lib/firestoreConnection'
import Link from 'next/link'

function MyBlogs({ userInfo }) {
    const [myPosts, setMyPosts] = useState(null)
    useEffect(() => {
        async function GetUserPosts() {
            const userPosts = await getAllPostsByAuthorId({ authorId: userInfo.uid })
            setMyPosts(userPosts);
        }
        GetUserPosts();
    }, [])

    if (myPosts === null) {
        return <p>Loading...</p>
    }

    if (myPosts.length === 0) {
        return <p>No content found!</p>
    }

    return (
        <div className="w-full">
            <div className='pl-2 pr-2 pt-3 pb-2 text-teal-500'>Contents: {myPosts.length}</div>
            <table className="m-1 table-auto p-2">
                <tbody>
                    {myPosts
                        .map((post) => (
                            <tr key={post.postId} className="border-b border-gray-400">
                                <td className="w-9">
                                    <Link href={`/blog/${post.postId}/${post.frontMatter.slug}`}>
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
                                    </Link>
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
