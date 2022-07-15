import { getFirestore, collection, query, addDoc, doc, getDocs, where, getDoc } from 'firebase/firestore'
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
    posts.push({...doc.data().frontMatter, postId: doc.id})
  })

  return posts
}

export async function getPostFrontMatterByPostIdAndSlug(postId="", slug="") {
  let postData = null;
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    postData = docSnap.data().slug === slug ? {...docSnap.data(), postId } : 'NODATA';
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  if (postData === null) {
    postData = 'NODATA';
  }
  return postData;
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


// export async function getPostFrontMatterBySlug(slug="") {
//   let postData = null
//   const q = query(collection(db, 'posts'), where('slug', '==', slug))
//   const querySnapshot = await getDocs(q)

//   querySnapshot.forEach((doc) => {
//     postData = doc.data()
//   })

//   if (postData === null) {
//     postData = 'NODATA'
//   }
//   return postData
// }