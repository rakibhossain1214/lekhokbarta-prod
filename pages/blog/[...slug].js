import React from 'react'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/config/firebase.config'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import PostLayout from '@/layouts/PostLayout'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

function Blog({ postData, prev, next }) {
  return (
    <div>
      {postData === null ?
        <>Loading...</>
        :
        postData !== "NODATA" ?
          <PostLayout
            frontMatter={postData.frontMatter}
            authorDetails={postData.authorDetails}
            children={postData.content}
            prev={prev}
            next={next}
          />
          :
          <>
            <PageSEO title={`Page Not Found - ${siteMetadata.title}`} />
            <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
              <div className="space-x-2 pt-6 pb-8 md:space-y-5">
                <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
                  404
                </h1>
              </div>
              <div className="max-w-md">
                <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
                  Sorry we couldn't find this page.
                </p>
                <p className="mb-8">
                  But dont worry, you can find plenty of other things on our homepage.
                </p>
                <Link href="/">
                  <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
                    Back to homepage
                  </button>
                </Link>
              </div>
            </div>
          </>
      }
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
  let postData = null;
  console.log("Primary PostData: ", postData)
  const q = query(collection(db, 'posts'), where('slug', '==', params.slug[0]))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    postData = doc.data()
  })
  
  if (postData === null) {
    postData = "NODATA"
  }

  return {
    props: { postData, prev, next },
    revalidate: 1
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
    fallback: 'blocking'
  }
}
