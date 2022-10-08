import { getServerSideSitemap } from 'next-sitemap'
import siteMetadata from '../../data/siteMetadata'
import { getAllPostsFrontMatterWithPostId } from '../../lib/firestoreConnection'

export const getServerSideProps = async (ctx) => {
  let posts = await getAllPostsFrontMatterWithPostId()

  const newsSitemaps = posts.map((item) => ({
    loc: `${siteMetadata.siteUrl}/blog/${item.postId}/${item.slug}`,
    lastmod: new Date(item.lastmod).toISOString(),
  }))

  const fields = [...newsSitemaps]

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
