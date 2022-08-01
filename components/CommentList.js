import React, { useEffect, useState } from 'react'
import { withPublic } from '../src/hook/route'
import CommentOptions from './CommentOptions'
import Moment from 'react-moment'
import 'moment-timezone'
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore'
import Image from '@/components/Image'
import UpArrow from '../public/static/images/up-arrow.png'
import DownArrow from '../public/static/images/down-arrow.png'
import { increaseVote, decreaseVote, updateComment, deleteComment } from '@/lib/firestoreConnection'

function CommentList({ postId, auth }) {
  const { user } = auth
  // console.log("User: ", user)
  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setDownVoted] = useState(false)
  const [comEditId, setComEditId] = useState(null)
  const [comDeleteId, setComDeleteId] = useState(null)
  const [editable, setEditable] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [voteError, setVoteError] = useState('')

  const db = getFirestore()
  const postRef = doc(db, 'posts', postId)

  const [postData, setPostData] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(postRef, (doc) => {
      setPostData(doc.data())
    })
  }, [])

  useEffect(() => {
    const unsub1 = onSnapshot(postRef, (doc) => {
      doc.data()?.upVote.map((item) => {
        if (item === user?.uid) {
          setUpVoted(true)
        } else {
          setUpVoted(false)
        }
      })
    })
  }, [])

  useEffect(() => {
    const unsub2 = onSnapshot(postRef, (doc) => {
      doc.data()?.downVote.map((item) => {
        if (item === user?.uid) {
          setDownVoted(true)
        } else {
          setDownVoted(false)
        }
      })
    })
  }, [])

  if (postData === null) {
    return <>Loading...</>
  }

  const handleUpvote = () => {
    if (user !== null) {
      setDownVoted(false)
      setUpVoted(!upVoted)
      increaseVote({ postId: postId, uid: user?.uid, postData: postData })
    } else {
      setVoteError('Please login to vote...')
    }
  }

  const handleDownVote = () => {
    if (user !== null) {
      setUpVoted(false)
      setDownVoted(!downVoted)
      decreaseVote({ postId: postId, uid: user?.uid, postData: postData })
    } else {
      setVoteError('Please login to vote...')
    }
  }

  const onOptionsEdit = (id) => {
    setEditable(!editable)
    setComEditId(id)
  }

  const onOptionsDelete = (id) => {
    setComDeleteId(id)
    deleteComment({ postId, postData, commentId: id })
  }

  const handleChangeComment = (e) => {
    if (e.target.value !== '') {
      setButtonActive(true)
      setCommentText(e.target.value)
    } else {
      setButtonActive(false)
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setEditable(false)
    updateComment({ postId, user, commentText, postData, commentId: comEditId })
  }

  return (
    <div className="bg-white dark:bg-stone-800">
      <h4 className="p-2">
        <button onClick={handleUpvote}>
          <Image
            src={UpArrow}
            width="25px"
            height="25px"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          {upVoted ? 'Voted' : 'Up vote'}
        </button>
        <span> ( {postData.upVote.length} ) </span> |
        <button className="pl-4" onClick={handleDownVote}>
          <Image
            src={DownArrow}
            width="25px"
            height="25px"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          {downVoted ? 'Voted' : 'Down vote'}
        </button>
        <span> ( {postData.downVote.length} ) </span> |<button className="pl-4"> Comments </button>
        <span> ( {postData.comments.length} ) </span>
      </h4>
      <p className="ml-4 text-red-500">{voteError}</p>
      {postData.comments.map((comment, i) => (
        <div
          key={i++}
          className="bg-white-500 w-full rounded border-b pt-3 shadow-lg dark:bg-stone-900"
        >
          <div className="ml-3 flex">
            <div className="mr-3">
              <Image
                src={comment?.photoURL}
                width="38px"
                height="38px"
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />
              {/* <img src={comment?.photoURL} alt="" className='rounded-full' style={{ width: '40px' }} /> */}
            </div>
            <div>
              <h4 className="font-semibold">{comment?.displayName}</h4>
              <p className="text-xs text-gray-500">
                <Moment fromNow>{comment.modifiedAt}</Moment>
              </p>
            </div>
            {comment?.uid === user?.uid ? (
              <CommentOptions
                onEdit={onOptionsEdit}
                onDelete={onOptionsDelete}
                postData={postData}
                commentId={i}
              />
            ) : (
              ''
            )}
          </div>

          <div className="mt-1 w-full p-1">
            {comEditId === i && editable ? (
              <div className="mt-1 w-full p-1">
                <textarea
                  // id="commentArea"
                  rows="3"
                  onChange={handleChangeComment}
                  className="w-full rounded border p-2 dark:bg-gray-900"
                  placeholder="Leave a comment..."
                  defaultValue={comment.commentText}
                ></textarea>

                {buttonActive ? (
                  <div className="flex justify-end">
                    <div className="text-base font-medium leading-6">
                      <button
                        onClick={handleUpdate}
                        className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                      >
                        Update
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
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="pl-2 pb-4 text-sm text-gray-800 dark:text-gray-200">
                {comment.commentText}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withPublic(CommentList)
