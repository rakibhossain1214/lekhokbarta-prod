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
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore'
import kebabCase from './utils/kebabCase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

const storage = getStorage()

const metadata = {
  contentType: 'image/jpeg',
}

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

export async function getAllPostsByAuthorId({ authorId }) {
  const queryPosts = query(collection(db, 'posts'),  where("authorDetails.id", "==", authorId))
  const querySnapshotPosts = await getDocs(queryPosts)
  const posts = querySnapshotPosts.docs.map((doc) => ({
    frontMatter: { ...doc.data().frontMatter },
    postId: doc.id,
    images: doc.data().images
  }))

  posts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date)
  })

  return posts
}

export async function getAllPostsFrontMatterWithPostId() {
  const queryPosts = query(collection(db, 'posts'),  where("frontMatter.draft", "==", false))
  const querySnapshotPosts = await getDocs(queryPosts)
  const posts = querySnapshotPosts.docs.map((doc) => ({
    ...doc.data().frontMatter,
    postId: doc.id,
    date: doc.data().date,
    lastmod: doc.data().lastmod,
    authorDetails: doc.data().authorDetails,
  }))
  posts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date)
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

export async function getPostFrontMatterByPostId(postId = '') {
  let postData = null
  const docRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    postData = {
      ...docSnap.data().frontMatter,
      postId,
      authorDetails: docSnap.data().authorDetails,
    }
  } else {
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
        const formattedTag = kebabCase(tag.value)
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

export async function getAllTagsArray() {
  let tagCount = []
  const posts = []

  const queryPosts = query(collection(db, 'posts'))
  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push(doc.data().frontMatter)
  })

  posts.map((data) => {
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        tagCount.push(tag)
      })
    }
  })

  var result = tagCount.reduce((unique, o) => {
    if (!unique.some((obj) => obj.label === o.label && obj.value === o.value)) {
      unique.push(o)
    }
    return unique
  }, [])

  return result
}

export async function addPost({ values, author, selectedTags }) {
  return addDoc(collection(db, 'posts'), {
    frontMatter: {
      title: values.title,
      category: values.category,
      postType: 'regular',
      tags: selectedTags,
      draft: true,
      status: 'pending',
      summary: values.summary,
      layout: '',
      bibliography: '',
      canonicalurl: '',
      coverImage: '',
      postThumbnail: '',
      viewCount: 0,
      impressionCount: 0,
      slug: kebabCase(values.title),
      wordCount: 0,
      postLanguage: 'bn',
      featuredScore: 0,
      featuredExpireDate: null,
    },
    content: '',
    authorDetails: {
      id: author?.uid,
      name: author?.displayName,
      avatar: author?.photoURL,
      occupation: author?.occupation,
      company: author?.company,
    },
    date: new Date().toString(),
    lastmod: new Date().toString(),
    upVote: [],
    downVote: [],
    comments: [],
    viewers: [],
    impressionList: [],
    suggestedBlogs: [],
    referenceSources: '',
    prevReferenceBlog: '',
    nextReferenceBlog: '',
    draftNote: '',
    images: [],
  })
}


export async function deletePost({ postId, post }) {
  await deleteDoc(doc(db, "posts", postId))
  
  if(post.frontMatter.postThumbnail !== undefined && post.frontMatter.postThumbnail !== ''){
    const thumbnailRef = ref(storage, post.frontMatter.postThumbnail)
    await deleteObject(thumbnailRef)
  }

  if(post.images.length > 0){
    post.images.map(async (item)=>{
      await deleteObject(ref(storage, item))
    })
  }
}

export async function updatePost({ postData, values, selectedTags }) {
  const postRef = doc(db, 'posts', postData.postId)

  await updateDoc(postRef, {
    "frontMatter.title": values.title,
    "frontMatter.category": kebabCase(values.category.toLowerCase()),
    "frontMatter.tags": selectedTags,
    "frontMatter.summary": values.summary,
    "frontMatter.status": 'pending',
    "frontMatter.draft": true
  })
}

export async function updatePostContent({ content, postData, wordCount }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    content: content,
    "frontMatter.wordCount": wordCount,
    "frontMatter.status": 'pending',
    "frontMatter.draft": true,
    lastmod: new Date().toString()
  })
}

export async function updatePostContentForImageUpload({ content, postData, wordCount }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    content: content,
    "frontMatter.wordCount": wordCount,
    lastmod: new Date().toString()
  })
}

export async function addEditorPhotosToDb({ postData, imageArray }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    images: imageArray,
    lastmod: new Date().toString()
  })
}

export async function updatePostDraft({ postData }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    "frontMatter.status": 'pending',
    "frontMatter.draft": true,
    lastmod: new Date().toString()
  })
}

export async function updatePostPublish({ postData }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    "frontMatter.status": 'submitted',
    "frontMatter.draft": false,
    lastmod: new Date().toString()
  })
  //next step after review -> approved
}

export async function updatePostSource({ postData, postSource }) {
  const postRef = doc(db, 'posts', postData.postId)
  await updateDoc(postRef, {
    referenceSources: postSource,
    "frontMatter.status": 'pending',
    "frontMatter.draft": true,
    lastmod: new Date().toString()
  })
  //next step after review -> approved
}

export async function AddComment({ postId, user, commentText, postData }) {
  const postRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(postRef)
  let commentList = []

  commentList.push({
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
    commentText: commentText,
  })

  if (docSnap.exists()) {
    docSnap.data().comments?.map((comment) => {
      commentList.push({
        displayName: comment.displayName,
        photoURL: comment.photoURL,
        uid: comment.uid,
        createdAt: comment.createdAt,
        modifiedAt: comment.modifiedAt,
        commentText: comment.commentText,
      })
    })
  } else {
    console.log('No such document!')
  }

  await setDoc(postRef, {
    ...postData,
    comments: commentList,
  })
}

export async function updateComment({ postId, user, commentText, postData, commentId }) {
  const postRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(postRef)
  let commentList = []

  postData.comments.map((comment, i) => {
    if (i !== commentId) {
      commentList.push(comment)
    } else {
      comment.commentText = commentText
      comment.displayName = user.displayName
      comment.uid = user.uid
      comment.modifiedAt = new Date().toString()
      comment.photoURL = user.photoURL
      commentList.push(comment)
    }
  })

  await setDoc(postRef, {
    ...postData,
    comments: commentList,
  })
}

export async function deleteComment({ postId, postData, commentId }) {
  const postRef = doc(db, 'posts', postId)
  let commentList = []

  postData.comments.map((comment, i) => {
    if (i !== commentId) {
      commentList.push(comment)
    }
  })

  await setDoc(postRef, {
    ...postData,
    comments: commentList,
  })
}

export async function increaseVote({ user, postId, postData }) {
  const postRef = doc(db, 'posts', postId)
  let alreadyVoted = false

  await updateDoc(postRef, {
    downVote: arrayRemove(user.uid),
  })

  postData.upVote.map((item) => {
    if (item === user.uid) {
      alreadyVoted = true
    }
  })

  if (alreadyVoted) {
    await updateDoc(postRef, {
      upVote: arrayRemove(user.uid),
    })
  } else {
    await updateDoc(postRef, {
      upVote: arrayUnion(user.uid),
    })

    // addPostSuggestionData({
    //   user,
    //   category: postData.frontMatter.category,
    //   tags: postData.frontMatter.tags,
    // })
  }
}

export async function decreaseVote({ uid, postId, postData }) {
  const postRef = doc(db, 'posts', postId)
  let alreadyVoted = false

  await updateDoc(postRef, {
    upVote: arrayRemove(uid),
  })

  postData.downVote.map((item) => {
    if (item === uid) {
      alreadyVoted = true
    }
  })

  if (alreadyVoted) {
    await updateDoc(postRef, {
      downVote: arrayRemove(uid),
    })
  } else {
    await updateDoc(postRef, {
      downVote: arrayUnion(uid),
    })
  }
}

export async function UploadToServer(file, postId) {
  let photoURL = ''
  const storageRef = ref(storage, 'images/' + postId + '/' + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        photoURL = downloadURL
      })
    }
  )

  return photoURL
}

//******* Post *******//

//******* User *******//

export async function addUserToDb(user) {
  const userInfo = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    providerId: user.providerId,
    uid: user.uid,
    profileCover: '',
    messageIn: [],
    messageOut: [],
    notifications: [],
    authorScore: 50,
    earnedCoins: 0,
    postConnect: 0,
    totalPostCount: 0,
    dailyPostCount: 0,
    blogScore: 0,
    contibutionScore: 0,
    phoneNumber: '',
    occupation: '',
    company: '',
    trxAccount: [],
    address: '',
    locationOnMap: '',
    city: '',
    country: '',
    userRole: 'regular',
    userType: 'regular',
    authorType: 'regular',
    advertiserType: 'regular',
    followers: [],
    following: [],
    balance: 0,
    totalWithdraw: 0,
    trxHistory: [],
    favoriteCategories: [],
    favoriteTags: [],
    socialAccounts: [],
    createdAt: user.metadata.creationTime,
    updatedAt: '',
    favoriteBlogs: [],
  }
  return setDoc(doc(db, 'users', user.uid), userInfo)
}

export async function getUserInfo(uid) {
  let userInfo = null

  if (uid !== undefined) {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      userInfo = docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such user document!')
    }
  }

  return userInfo !== null ? userInfo : 'NODATA'
}

export async function AddFollower({ userInfo, user }) {
  const userRefFollower = doc(db, 'users', userInfo.uid)
  const userRefFollowing = doc(db, 'users', user.uid)

  await updateDoc(userRefFollower, {
    followers: arrayUnion({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    }),
  })

  await updateDoc(userRefFollowing, {
    following: arrayUnion({
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
      uid: userInfo.uid,
    }),
  })
}

export async function deleteFollower({ userInfo, user }) {
  const removeFollowerRef = doc(db, 'users', userInfo.uid)
  const removeFollowingRef = doc(db, 'users', user.uid)

  await updateDoc(removeFollowerRef, {
    followers: arrayRemove({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    }),
  })

  await updateDoc(removeFollowingRef, {
    following: arrayRemove({
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
      uid: userInfo.uid,
    }),
  })
}

export async function AddToFavoriteBlogs({
  postId,
  title,
  slug,
  postThumbnail,
  authorName,
  authorId,
  authorAvatar,
  user,
  category,
  tags,
}) {
  const userRef = doc(db, 'users', user.uid)

  await updateDoc(userRef, {
    favoriteBlogs: arrayUnion({
      postId,
      title,
      slug,
      postThumbnail,
      authorName,
      authorId,
      authorAvatar,
      category,
      tags,
    }),
  })

  // await addPostSuggestionData({ user, category, tags })
}

export async function RemoveFavoriteBlogs({
  postId,
  title,
  slug,
  postThumbnail,
  authorName,
  authorId,
  authorAvatar,
  user,
  category,
  tags,
}) {
  const userRef = doc(db, 'users', user.uid)
  await updateDoc(userRef, {
    favoriteBlogs: arrayRemove({
      postId,
      title,
      slug,
      postThumbnail,
      authorName,
      authorId,
      authorAvatar,
      category,
      tags,
    }),
  })

  // await rempovePostSuggestionData({ user, category, tags })
}

// export async function addPostSuggestionData({ user, category, tags }) {
//   const userRef = doc(db, 'users', user.uid)

//   if (user.favoriteCategories.length < 10) {
//     if (!user.favoriteCategories.includes(category)) {
//       await updateDoc(userRef, {
//         favoriteCategories: arrayUnion(category),
//       })
//     }
//   }

//   if (user.favoriteTags.length < 100) {
//     tags.map(async (t) => {
//       if (!user.favoriteTags.includes(t)) {
//         await updateDoc(userRef, {
//           favoriteTags: arrayUnion(t),
//         })
//       }
//     })
//   }
// }

// export async function rempovePostSuggestionData({ user, category, tags }) {
//   const userRef = doc(db, 'users', user.uid)

//   await updateDoc(userRef, {
//     favoriteCategories: arrayRemove(category),
//   })

//   tags.map(async (t) => {
//     await updateDoc(userRef, {
//       favoriteTags: arrayRemove(t),
//     })
//   })
// }
//******* User *******//
