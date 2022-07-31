import React from 'react'
import PostLayout from '@/layouts/PostLayout'
import Link from '@/components/Link'
// import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import { getAllPostsFrontMatterWithPostId, getPostFrontMatterByPostIdAndSlug } from '@/lib/firestoreConnection'
// import generateRss from '@/lib/generate-rss'

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
            children={postData.frontMatter.content}
            prev={prev}
            next={next}
            date={postData.date}
            lastmod={postData.lastmod}
            postId={postData.postId}
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
  const allPosts = await getAllPostsFrontMatterWithPostId();

  const postIndex = allPosts.findIndex((post) => post.postId === params.slug[0] && post.slug === params.slug[1])

  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null

  let postData = await getPostFrontMatterByPostIdAndSlug(params.slug[0], params.slug[1]);

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
