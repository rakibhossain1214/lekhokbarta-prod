import React, { useState } from 'react'
import { getTestPost } from '@/lib/firestoreConnection'
import CKEditor from 'react-ckeditor-component'
// import { CKEditor } from 'ckeditor4-react';

function ShowData({ content }) {
  let config = {
    removePlugins: 'toolbar,resize',
    allowedContent: true,
    readOnly: true,

    // height: '100%',
    // contentsCss: 'body {display: block; overflow: auto;}',
    // autoGrow_onStartup: true,
  }

  function createMarkup() {
    return { __html: content }
  }

  return (
    <div>
      {/* <CKEditor
                className="my-custom-editor"
                config={config}
                content={content}
            /> */}

      {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
    </div>
  )
}

export default ShowData

export async function getServerSideProps() {
  const content = await getTestPost()

  if (content === null) {
    return <>Loading...</>
  }

  console.log('Content', content)

  return {
    props: { content },
    // revalidate: 1
  }
}
