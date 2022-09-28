import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import { getAllPostsFrontMatterWithPostId } from '@/lib/firestoreConnection'
import BlogListLayout from '@/layouts/BlogListLayout'
import { withPublic } from 'src/hook/route'

export async function getServerSideProps({ params }) {
  const posts = await getAllPostsFrontMatterWithPostId()
  const filteredPosts = posts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t.value)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

function Tag({ posts, tag, auth }) {
  const { user, setUser } = auth
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <BlogListLayout posts={posts} title={title} user={user} setUser={setUser} />
    </>
  )
}

export default withPublic(Tag)
