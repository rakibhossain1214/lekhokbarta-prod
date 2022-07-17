import React, { useState } from 'react'
import RichEditor from './RichEditor'
import { addDoc, collection, getFirestore, doc, setDoc } from 'firebase/firestore'
import { getTestPost } from '@/lib/firestoreConnection'

function Write({ content }) {
  const [editorData, setEditorData] = useState(null)

  const handleChange = (data) => {
    setEditorData(data)
  }

  // console.log("EditorData: ", editorData);
  const db = getFirestore()
  const addData = () => {
    //   addDoc(collection(db, 'content'), {
    //     content: editorData
    //   })
    const cityRef = doc(db, 'content', 'test')
    setDoc(cityRef, { editorData })
  }

  return (
    <div>
      <RichEditor handleChange={handleChange} editorContent={content} />
      <button onClick={addData}>Add Data</button>
    </div>
  )
}

export default Write

export async function getServerSideProps() {
  const content = await getTestPost()

  return {
    props: { content },
    // revalidate: 1
  }
}
