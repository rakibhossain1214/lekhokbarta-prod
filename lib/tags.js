import kebabCase from './utils/kebabCase'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from 'src/config/firebase.config'
import { collection, query, getDocs } from 'firebase/firestore'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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
