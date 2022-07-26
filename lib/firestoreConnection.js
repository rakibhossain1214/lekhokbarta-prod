import {
  getFirestore,
  collection,
  query,
  addDoc,
  doc,
  getDocs,
  where,
  getDoc,
  orderBy,
  limit,
} from 'firebase/firestore'
import kebabCase from './utils/kebabCase'

// Initialize Firebase
const db = getFirestore()

//******* Post *******//
// export async function getAllPostsFrontMatter() {
//   const posts = []
//   const queryPosts = query(collection(db, 'posts'))

//   const querySnapshotPosts = await getDocs(queryPosts)
//   querySnapshotPosts.forEach((doc) => {
//     posts.push(doc.data().frontMatter)
//   })

//   return posts
// }

export async function getAllPostsFrontMatterWithPostId() {
  const posts = []
  const queryPosts = query(collection(db, 'posts'), orderBy('date', 'desc'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push({
      ...doc.data().frontMatter,
      postId: doc.id,
      date: doc.data().date,
      lastmod: doc.data().lastmod,
    })
  })

  return posts
}

export async function getPostFrontMatterByPostIdAndSlug(postId = '', slug = '') {
  let postData = null
  const docRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    postData =
      docSnap.data().frontMatter.slug === slug
        ? { ...docSnap.data(), postId, date: docSnap.data().date, lastmod: docSnap.data().lastmod }
        : 'NODATA'
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }

  if (postData === null) {
    postData = 'NODATA'
  }
  return postData
}

export async function getPostFrontMatterByUserIdAndPostId(userId = '', postId = '') {
  let postData = null
  const docRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    postData =
      docSnap.data()?.authorDetails?.id === userId ? { ...docSnap.data(), postId } : 'NODATA'
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }

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

export async function addPost({ values, author }) {
  return addDoc(collection(db, 'posts'), {
    frontMatter: {
      title: values.title,
      category: values.category,
      postType: 'regular',
      tags: [],
      draft: false,
      summary: values.summary,
      content: '',
      layout: '',
      bibliography: '',
      canonicalurl: '',
      images: [],
      views: 0,
      viewers: [],
      slug: kebabCase(values.title),
      upVote: [],
      downVote: [],
      comments: [],
    },
    authorDetails: {
      id: author?.uid,
      name: author?.displayName,
      avatar: author?.photoURL,
      occupation: author?.occupation,
      company: author?.company,
    },
    date: new Date().toString(),
    lastmod: new Date().toString(),
  })
}

//******* Post *******//

//******* User *******//

export async function getUserInfo(uid) {
  let userInfo = null
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    userInfo = docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such user document!')
  }

  return userInfo !== null ? userInfo : null
}

//******* User *******//
