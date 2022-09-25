import React from 'react'
import BlogListLayout from '@/layouts/BlogListLayout'
import { getAllPostsFrontMatterWithPostId } from '@/lib/firestoreConnection'

export const POSTS_PER_PAGE = 5

export async function getServerSideProps() {
  const posts = await getAllPostsFrontMatterWithPostId()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

function Home({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <BlogListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  )
}

export default Home
