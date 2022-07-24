import React from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { getPostFrontMatterByUserIdAndPostId } from '@/lib/firestoreConnection'
import { withProtected } from 'src/hook/route'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(() => import('@/components/SunEditor'), {
  ssr: false,
})

function CreateContent({ postData, auth }) {
  const { user, logout } = auth
  const db = getFirestore()
  const postRef = doc(db, 'posts', postData.postId)

  const handleChange = (data) => {
    setDoc(postRef, { ...postData, content: data })
  }

  if (postData?.authorDetails?.id !== user.uid) {
    return (
      <>
        <div className="mt-24 text-center">
          <PageTitle>
            You dont have permission!{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
          <Link href="/">
            <button className="focus:shadow-outline-blue my-5 inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Back to homepage
            </button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <div>
      <SunEditor handleChange={handleChange} editorContent={postData.content} />
    </div>
  )
}

export default withProtected(CreateContent)

export async function getServerSideProps({ params }) {
  if (params.slug[1] === undefined || params.slug[0] === undefined) {
    return {
      props: { postData: null },
    }
  }

  const postData = await getPostFrontMatterByUserIdAndPostId(params.slug[0], params.slug[1])
  return {
    props: { postData: postData !== undefined ? postData : null },
    // revalidate: 1
  }
}
