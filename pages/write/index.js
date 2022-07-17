import React, { useState } from 'react'
import RichEditor from './RichEditor'
import { addDoc, collection, getFirestore, doc, setDoc } from 'firebase/firestore'

function Write() {
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
      <RichEditor handleChange={handleChange} />
      <button onClick={addData}>Add Data</button>
    </div>
  )
}

export default Write
