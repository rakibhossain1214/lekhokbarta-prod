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
import Link from '@/components/Link'
// import fs from 'fs'
import PageTitle from '@/components/PageTitle'
// import generateRss from '@/lib/generate-rss'

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
            <div className="mt-24 text-center">
              <PageTitle>
                No Post Found! {' '}
                <span role="img" aria-label="roadwork sign">
                  🚧
                </span>
              </PageTitle>
              <Link href="/">
                <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 my-5 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
                  Back to homepage
                </button>
              </Link>
            </div>
          </>
      }
    </div>
  )
}
export default Blog

export async function getServerSideProps({ params }) {
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

  const q = query(collection(db, 'posts'), where('slug', '==', params.slug[0]))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    postData = doc.data()
  })

  if (postData === null) {
    postData = "NODATA"
  }

  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync('./public/feed.xml', rss)
  // }

  return {
    props: { postData, prev, next },
    // revalidate: 1
  }
}

// export async function getStaticPaths() {
//   const pathsArray = []
//   const q = query(collection(db, 'posts'))
//   const querySnapshot = await getDocs(q)
//   querySnapshot.forEach((doc) => {
//     pathsArray.push({ params: { slug: [doc.data().frontMatter.slug] } })
//   })

//   return {
//     paths: pathsArray,
//     fallback: 'blocking'
//   }
// }
