import { async } from '@firebase/util'
import { useRadioGroup } from '@material-ui/core'
import {
  getFirestore,
  collection,
  query,
  addDoc,
  doc,
  getDocs,
  where,
  getDoc,
} from 'firebase/firestore'
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

export async function getAllPostsFrontMatterWithPostId() {
  const posts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push({ ...doc.data().frontMatter, postId: doc.id })
  })

  return posts
}

export async function getPostFrontMatterByPostIdAndSlug(postId = '', slug = '') {
  let postData = null
  const docRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    postData = docSnap.data().frontMatter.slug === slug ? { ...docSnap.data(), postId } : 'NODATA'
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

export async function getTestPost() {
  let content = null
  const docRef = doc(db, 'content', 'test')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    content = docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }

  return content !== null ? content.editorData : null
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

export async function addPost({ values, user }) {
  return addDoc(collection(db, 'posts'), {
    frontMatter: {
      title: values.title,
      date: new Date().toString(),
      category: values.category,
      tags: [],
      draft: false,
      summary:
        'How to derive the OLS Estimator with matrix notation and a tour of math typesetting using markdown with the help of KaTeX.',
      layout: '',
      bibliography: '',
      canonicalurl: '',
      images: [],
      slug: kebabCase(values.title),
    },
    authorDetails: {
      id: user.uid,
      name: 'Anup',
      avatar: '',
      occupation: 'student',
      company: 'DU',
    },
    content:
      'How to derive the OLS Estimator with matrix notation and a tour of math typesetting using markdown with the help of KaTeX.',
  })
}

//******* Post *******//
