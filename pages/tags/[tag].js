import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/utils/kebabCase'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from 'src/config/firebase.config'
import { collection, query, addDoc, getDocs } from 'firebase/firestore'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function getServerSideProps({ params }) {
  const posts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push(doc.data().frontMatter)
  })

  const filteredPosts = posts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
