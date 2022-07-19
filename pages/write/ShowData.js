import React, { useState } from 'react'
import { getTestPost } from '@/lib/firestoreConnection'
import 'suneditor/dist/css/suneditor.min.css'
import dynamic from 'next/dynamic'
const SunViewer = dynamic(() => import('@/components/SunViewer'), {
  ssr: false,
})
function ShowData({ content }) {
  // function createMarkup() {
  //   return { __html: content }
  // }

  function createMarkup() {
    console.log(content.length)

    return content
  }

  if (content === null) {
    return <>No Data</>
  }

  // console.log("content: ", content);
  // console.log("markup: ", content);

  return (
    <div>
      {/* <article
        className="
            prose 
            max-w-none 
            dark:prose-invert
            dark:prose-headings:text-gray-100
            dark:prose-p:text-gray-400
            dark:prose-strong:text-gray-300
            dark:prose-table:text-gray-300
            dark:prose-lead:text-gray-300
          "
      >
        <div dangerouslySetInnerHTML={createMarkup()} />
      </article> */}

      <SunViewer editorContent={createMarkup()} />
    </div>
  )
}

export default ShowData

export async function getServerSideProps() {
  const content = await getTestPost()

  return {
    props: { content },
    // revalidate: 1
  }
}
