import { getFirestore, collection, query, addDoc, getDocs, where } from 'firebase/firestore'
import kebabCase from './utils/kebabCase'

// Initialize Firebase
const db = getFirestore()

//******* Post *******//
export async function getAllPostsFrontMatter() {
  const posts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push(doc.data().frontMatter)
  })

  return posts
}

export async function getPostFrontMatterBySlug(slug) {
  let postData = null
  const q = query(collection(db, 'posts'), where('slug', '==', slug))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    postData = doc.data()
  })

  if (postData === null) {
    postData = 'NODATA'
  }
  return postData
}

export async function getAllTags() {
  let tagCount = {}
  const posts = []

  const queryPosts = query(collection(db, 'posts'))
  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push(doc.data().frontMatter)
  })

  posts.map((data) => {
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}

//******* Post *******//
