import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getAllPostsFrontMatterWithPostId } from '@/lib/firestoreConnection'
import siteMetadata from '@/data/siteMetadata'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts: any[] = await getAllPostsFrontMatterWithPostId()
  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `${siteMetadata.siteUrl}/blog/${post.postId}/${post.slug}`,
    lastmod: new Date(post.lastmod).toISOString(),
  }))
  return getServerSideSitemap(ctx, fields)
}
export default function SitemapIndex() {}
