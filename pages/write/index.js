import React, { useState } from 'react'
import RichEditor from './RichEditor'

function Write() {
  const [editorData, setEditorData] = useState(null)

  const handleChange = (data) => {
    setEditorData(data)
  }

  // console.log("EditorData: ", editorData);

  return (
    <div>
      <RichEditor handleChange={handleChange} />
    </div>
  )
}

export default Write
