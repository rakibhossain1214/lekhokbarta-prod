import React from 'react'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/config/firebase.config'
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  addDoc,
  getDocs,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import PostLayout from '@/layouts/PostLayout'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

function Blog({ postData, prev, next }) {
  return (
    <div>
      {postData.frontMatter === undefined ? (
        <>Loading...</>
      ) : (
        <PostLayout
          frontMatter={postData.frontMatter}
          authorDetails={postData.authorDetails}
          children={postData.content}
          prev={prev}
          next={next}
        />
      )}
    </div>
  )
}
export default Blog

export async function getStaticProps({ params }) {
  //process -> Next & Prev
  const allPosts = []
  const queryPosts = query(collection(db, 'posts'))

  const querySnapshotPosts = await getDocs(queryPosts)
  querySnapshotPosts.forEach((doc) => {
    allPosts.push(doc.data().frontMatter)
  })

  const postIndex = allPosts.findIndex((post) => post.slug === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null

  //process -> post
  let postData
  const q = query(collection(db, 'posts'), where('slug', '==', params.slug[0]))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    postData = doc.data()
  })

  return {
    props: { postData, prev, next },
  }
}

export async function getStaticPaths() {
  const pathsArray = []
  const q = query(collection(db, 'posts'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    pathsArray.push({ params: { slug: [doc.data().frontMatter.slug] } })
  })

  return {
    paths: pathsArray,
    fallback: false,
  }
}
