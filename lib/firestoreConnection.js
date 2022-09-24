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
} from 'firebase/firestore'
import kebabCase from './utils/kebabCase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

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
  const posts = []
  const authorPosts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push(doc.data())
  })

  posts.map((post) => {
    if (authorId === post.authorDetails.id) {
      authorPosts.push(post)
    }
  })

  authorPosts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date)
  })

  return authorPosts
}

export async function getAllPostsFrontMatterWithPostId() {
  const posts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    posts.push({
      ...doc.data().frontMatter,
      postId: doc.id,
      date: doc.data().date,
      lastmod: doc.data().lastmod,
    })
  })

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
      draft: false,
      status: 'pending',
      summary: values.summary,
      content: '',
      layout: '',
      bibliography: '',
      canonicalurl: '',
      images: [],
      coverImage: '',
      postThumbnail: '',
      views: 0,
      viewers: [],
      slug: kebabCase(values.title),
      prevReferenceBlog: '',
      nextReferenceBlog: '',
      suggestedBlogs: [],
      referenceBlogs: [],
      characterCount: 0
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
    upVote: [],
    downVote: [],
    comments: [],
  })
}


export async function updatePost({ postData, values, selectedTags }) {
  const postRef = doc(db, 'posts', postData.postId)

  postData.frontMatter.title = values.title
  postData.frontMatter.category = values.category
  postData.frontMatter.tags = selectedTags
  postData.frontMatter.summary = values.summary

  await setDoc(postRef, { ...postData })
}

export async function updatePostContent({ content, postData, characterCount }) {
  const postRef = doc(db, 'posts', postData.postId)
  postData.frontMatter.content = content
  postData.frontMatter.characterCount = characterCount

  await setDoc(postRef, { ...postData })
}

export async function updatePostDraft({ postData }) {
  const postRef = doc(db, 'posts', postData.postId)
  postData.frontMatter.draft = true
  postData.frontMatter.status = "pending"
  await setDoc(postRef, { ...postData })
}

export async function updatePostPublish({ postData }) {
  const postRef = doc(db, 'posts', postData.postId)
  postData.frontMatter.draft = false
  postData.frontMatter.status = "approved"
  await setDoc(postRef, { ...postData })
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

export async function increaseVote({ uid, postId, postData }) {
  const postRef = doc(db, 'posts', postId)
  let alreadyVoted = false

  await updateDoc(postRef, {
    downVote: arrayRemove(uid),
  })

  postData.upVote.map((item) => {
    if (item === uid) {
      alreadyVoted = true
    }
  })

  if (alreadyVoted) {
    await updateDoc(postRef, {
      upVote: arrayRemove(uid),
    })
  } else {
    await updateDoc(postRef, {
      upVote: arrayUnion(uid),
    })
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

export async function AddFollower({ userId, user }) {
  const userInfo = await getUserInfo(user.uid)
  const postRef = doc(db, 'users', userId)
  const docSnap = await getDoc(postRef)
  let followerList = []

  followerList.push({
    displayName: userInfo.displayName,
    photoURL: userInfo.photoURL,
    uid: userInfo.uid,
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
  })

  if (docSnap.exists()) {
    docSnap.data().followers?.map((follower) => {
      followerList.push({
        displayName: follower.displayName,
        photoURL: follower.photoURL,
        uid: follower.uid,
        createdAt: follower.createdAt,
        modifiedAt: follower.modifiedAt,
      })
    })
  } else {
    console.log('No such document!')
  }

  await updateDoc(postRef, {
    followers: followerList,
  })
}

export async function AddFollowing({ userId, user }) {
  const userInfo = await getUserInfo(userId)
  const postRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(postRef)
  let followingList = []

  followingList.push({
    displayName: userInfo.displayName,
    photoURL: userInfo.photoURL,
    uid: userInfo.uid,
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
  })

  if (docSnap.exists()) {
    docSnap.data().following?.map((following) => {
      followingList.push({
        displayName: following.displayName,
        photoURL: following.photoURL,
        uid: following.uid,
        createdAt: following.createdAt,
        modifiedAt: following.modifiedAt,
      })
    })
  } else {
    console.log('No such document!')
  }

  await updateDoc(postRef, {
    following: followingList,
  })
}

export async function deleteFollower({ userId, user }) {
  const userInfo = await getUserInfo(userId)
  const postRef = doc(db, 'users', userId)
  let followList = []

  userInfo.followers.map((follow) => {
    if (follow.uid !== user.uid) {
      followList.push(follow)
    }
  })

  await updateDoc(postRef, {
    followers: followList,
  })
}

export async function deleteFollowing({ userId, user }) {
  const userInfo = await getUserInfo(user.uid)
  const postRef = doc(db, 'users', user.uid)
  let followingList = []

  userInfo.following.map((following) => {
    if (following.uid !== userId) {
      followingList.push(following)
    }
  })

  await updateDoc(postRef, {
    following: followingList,
  })
}

//******* User *******//
