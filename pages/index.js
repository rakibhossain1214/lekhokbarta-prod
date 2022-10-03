import React from 'react'
import BlogListLayout from '@/layouts/BlogListLayout'
import { getAllPostsFrontMatterWithPostId } from '@/lib/firestoreConnection'
import { withPublic } from 'src/hook/route'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export async function getServerSideProps() {
  const posts = await getAllPostsFrontMatterWithPostId()
  return { props: { posts } }
}

function Home({ posts, auth }) {
  const { user, setUser } = auth
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <BlogListLayout posts={posts} user={user} setUser={setUser} />
    </>
  )
}

export default withPublic(Home)
