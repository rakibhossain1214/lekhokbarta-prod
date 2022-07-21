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
  const googleAds =
    "<br> <div class='google-ads dark:prose-p:text-gray-300'> <p>Google Ads Banner</p></div> <br>"
  const googleNativeAds =
    "<div class='google-ads-native dark:prose-p:text-gray-300'> <p>Google Ads Native Banner</p></div>"

  //Show Sticky Banner Ads to Top and bottom => A-Ads
  //Show Social Popunder ads => Adsterra

  function createMarkup() {
    // console.log(content)
    let arr = content.split(/<br>/)
    return googleNativeAds + arr.join(googleAds).toString() + googleNativeAds
  }

  if (content === null) {
    return <>No Data</>
  }

  return (
    <div>
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
