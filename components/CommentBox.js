import React, { useState } from 'react'
import { AddComment } from '@/lib/firestoreConnection'
import Image from '@/components/Image'

function CommentBox({ user, postId, postData, handleCommentOpen }) {
  const [commentText, setCommentText] = useState('')
  const [buttonActive, setButtonActive] = useState(false)

  const handleChange = (e) => {
    if (e.target.value !== '') {
      setButtonActive(true)
      setCommentText(e.target.value)
    } else {
      setButtonActive(false)
    }
  }

  const handleSubmit = () => {
    document.getElementById('commentArea').value = ''
    setButtonActive(false)
    AddComment({ postId, user, commentText, postData })
    handleCommentOpen()
  }

  if (user === null) {
    return <div className="p-3 text-red-500">Please Log in to comment...</div>
  }
  return (
    <div className="mt-1 mb-4 w-full rounded bg-white pt-3 pb-3 pl-1 pr-1 shadow-lg dark:bg-gray-900">
      <div className="ml-3 flex">
        <div className="mr-3">
          <Image
            src={user?.photoURL}
            width="38px"
            height="38px"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div>
          <h4 className="font-semibold">{user?.displayName}</h4>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="mt-3 w-full p-1">
        <textarea
          id="commentArea"
          rows="3"
          onChange={handleChange}
          className="w-full rounded border p-2 dark:bg-gray-900"
          placeholder="Leave a comment..."
        ></textarea>
      </div>

      {buttonActive ? (
        <div className="flex justify-end">
          <div className="text-base font-medium leading-6">
            <button
              onClick={handleSubmit}
              className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
            >
              Comment
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="text-base font-medium leading-6">
            <button
              disabled
              className="focus:shadow-outline-gray mx-1 inline rounded-lg border border-transparent bg-gray-300 px-4 py-1 text-sm font-medium leading-5 text-gray-500"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentBox
