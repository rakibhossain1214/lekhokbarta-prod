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

  // function createTestMarkup() {
  //   // console.log(content.length)

  //   let arr = content.split(/br/);

  //   console.log(arr);

  //   return content
  // }
  const googleAds =
    "<br> <div class='google-ads dark:prose-p:text-gray-300'> <p>Google Ads Banner</p></div> <br>"
  const googleNativeAds =
    "<div class='google-ads-native dark:prose-p:text-gray-300'> <p>Google Ads Native Banner</p></div>"

  function createMarkup() {
    // console.log(content)
    let arr = content.split(/<br>/)
    return googleNativeAds + arr.join(googleAds).toString() + googleNativeAds
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
