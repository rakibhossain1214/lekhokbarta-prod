import React from 'react'
import BlogListLayout from '@/layouts/BlogListLayout'
import { getAllPostsFrontMatterWithPostId } from '@/lib/firestoreConnection'
import { withPublic } from 'src/hook/route'

export async function getServerSideProps() {
  const posts = await getAllPostsFrontMatterWithPostId()
  return { props: { posts } }
}

function Home({ posts, auth }) {
  const { user, setUser } = auth
  return (
    <>
      <BlogListLayout posts={posts} user={user} setUser={setUser} />
    </>
  )
}

export default withPublic(Home)
