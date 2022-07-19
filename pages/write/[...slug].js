import React, { useState } from 'react'
// import RichEditor from './RichEditor'
// import SunEditor from '@/components/SunEditor'
import { addDoc, collection, getFirestore, doc, setDoc } from 'firebase/firestore'
import { getTestPost } from '@/lib/firestoreConnection'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(() => import('@/components/SunEditor'), {
  ssr: false,
})

function CreateContent({ content }) {
  const db = getFirestore()
  const cityRef = doc(db, 'content', 'test')

  const [editorData, setEditorData] = useState(null)

  const handleChange = (data) => {
    setEditorData(data)

    setDoc(cityRef, { editorData: data })
  }

  // console.log("EditorData: ", editorData);

  // const addData = () => {
  //   //   addDoc(collection(db, 'content'), {
  //   //     content: editorData
  //   //   })
  //   setDoc(cityRef, { editorData })
  // }

  return (
    <div>
      <SunEditor
        handleChange={handleChange}
        editorContent={content}
        // saveData={saveData}
      />
      {/* <button onClick={addData}>Add Data</button> */}
    </div>
  )
}

export default CreateContent

export async function getServerSideProps() {
  const content = await getTestPost()
  // console.log(content)
  return {
    props: { content: content !== undefined ? content : null },
    // revalidate: 1
  }
}
