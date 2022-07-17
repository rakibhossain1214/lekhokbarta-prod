import React, { useState } from 'react'
import { getTestPost } from '@/lib/firestoreConnection'

function ShowData({ content }) {
  function createMarkup() {
    return { __html: content }
  }

  if (content === null) {
    return <>No Data</>
  }

  return (
    <div>
      <article
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
      </article>
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
