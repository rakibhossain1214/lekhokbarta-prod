import React, { useEffect, useState } from 'react'
import CommentOptions from './CommentOptions'
import Moment from 'react-moment'
import 'moment-timezone'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
import Image from '@/components/Image'
import UpArrow from '../public/static/images/up-vote.png'
import DownArrow from '../public/static/images/down-vote.png'
import Accept from '../public/static/images/accept.png'
import { increaseVote, decreaseVote, updateComment, deleteComment } from '@/lib/firestoreConnection'
import CommentBox from './CommentBox'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'
import LoadingComponent from './LoadingComponent'
import siteMetadata from '@/data/siteMetadata'

let size = 32

function CommentList({ postId, user, defaultPostData, loginWithGoogleNoRedirect }) {
  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setDownVoted] = useState(false)
  const [comEditId, setComEditId] = useState(null)
  const [comDeleteId, setComDeleteId] = useState(null)
  const [editable, setEditable] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [loadComment, setLoadComment] = useState(false)

  const db = getFirestore()
  const postRef = doc(db, 'posts', postId)
  const [postData, setPostData] = useState(defaultPostData)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    setLoadComment(false)
    setUpVoted(false)
    setDownVoted(false)
    setProcessing(true)

    const unsub = onSnapshot(postRef, (doc) => {
      setPostData(doc.data())

      doc.data().upVote.map((item) => {
        if (item === user?.uid) {
          setUpVoted(true)
          setDownVoted(false)
        } else {
          setUpVoted(false)
        }
      })

      doc.data().downVote.map((item) => {
        if (item === user?.uid) {
          setDownVoted(true)
          setUpVoted(false)
        } else {
          setDownVoted(false)
        }
      })

      setProcessing(false)
    })
    return function cleanup() {
      unsub()
    }
  }, [postId])

  if (postData === null) {
    return <LoadingComponent />
  }

  const handleUpvote = () => {
    setProcessing(true)
    if (user !== null) {
      setDownVoted(false)
      setUpVoted(!upVoted)
      increaseVote({ postId: postId, user, postData: postData }).then(() => {
        setProcessing(false)
      })
    }
  }

  const handleDownVote = () => {
    setProcessing(true)
    if (user !== null) {
      setUpVoted(false)
      setDownVoted(!downVoted)
      decreaseVote({ postId: postId, uid: user?.uid, postData: postData }).then(() => {
        setProcessing(false)
      })
    }
  }

  const onOptionsEdit = (id) => {
    setEditable(!editable)
    setComEditId(id)
  }

  const onOptionsDelete = (id) => {
    setEditable(false)
    setComDeleteId(id)
    deleteComment({ postId, postData, commentId: id })
  }

  const handleChangeComment = (e) => {
    if (
      e.target.value !== document.getElementById('commentArea').defaultValue &&
      e.target.value !== ''
    ) {
      setButtonActive(true)
      setCommentText(e.target.value)
    } else {
      setButtonActive(false)
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setButtonActive(false)
    setEditable(false)
    document.getElementById('commentArea').value =
      document.getElementById('commentArea').defaultValue
    updateComment({ postId, user, commentText, postData, commentId: comEditId })
  }

  const handleCommentOpen = () => {
    setLoadComment(true)
  }

  return (
    <>
      <div className="bg-white dark:bg-stone-800">
        <div className="block sm:flex sm:justify-between">
          <div className="flex justify-end">
            <FacebookShareButton
              quote={postData?.frontMatter.title}
              url={`${siteMetadata.siteUrl}/blog/${postData?.postId}/${postData?.frontMatter.slug}`}
              className="m-1"
            >
              <FacebookIcon size={size} />
            </FacebookShareButton>

            <TwitterShareButton
              title={postData?.frontMatter.title}
              url={`${siteMetadata.siteUrl}/blog/${postData?.postId}/${postData?.frontMatter.slug}`}
              className="m-1"
            >
              <TwitterIcon size={size} />
            </TwitterShareButton>

            <WhatsappShareButton
              title={postData?.frontMatter.title}
              separator=":: "
              url={`${siteMetadata.siteUrl}/blog/${postData?.postId}/${postData?.frontMatter.slug}`}
              className="m-1"
            >
              <WhatsappIcon size={size} />
            </WhatsappShareButton>

            <LinkedinShareButton
              title={postData?.frontMatter.title}
              windowWidth={750}
              windowHeight={600}
              url={`${siteMetadata.siteUrl}/blog/${postData?.postId}/${postData?.frontMatter.slug}`}
              className="m-1"
            >
              <LinkedinIcon size={size} />
            </LinkedinShareButton>
          </div>

          <p className="p-2">
            <button
              disabled={processing}
              className="rounded border-b border-teal-500 p-1"
              onClick={handleUpvote}
            >
              {upVoted ? (
                <Image
                  src={Accept}
                  width="25px"
                  height="25px"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <Image
                  src={UpArrow}
                  width="25px"
                  height="25px"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <span> ( {postData.upVote?.length} ) </span>
            </button>

            <button
              disabled={processing}
              className="ml-2 mr-2 rounded border-b border-teal-500 p-1"
              onClick={handleDownVote}
            >
              {downVoted ? (
                <Image
                  src={Accept}
                  width="25px"
                  height="25px"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <Image
                  src={DownArrow}
                  width="25px"
                  height="25px"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <span> ( {postData.downVote?.length} ) </span>
            </button>
            <button
              className="border-b border-teal-500 p-1"
              onClick={() => setLoadComment(!loadComment)}
            >
              {loadComment ? 'Hide Comments' : 'Show Comments'}
              <span> ( {postData.comments.length} ) </span>
            </button>
          </p>
        </div>

        {loadComment &&
          postData.comments.map((comment, i) => (
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
                      id="commentArea"
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
                        <div className="text-base font-medium leading-6">
                          <button
                            onClick={() => {
                              setButtonActive(false)
                              setEditable(false)
                            }}
                            className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                          >
                            Cancel
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
                        <div className="text-base font-medium leading-6">
                          <button
                            onClick={() => {
                              setButtonActive(false)
                              setEditable(false)
                            }}
                            className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                          >
                            Cancel
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
      {user !== null ? (
        <CommentBox
          postId={postId}
          postData={postData}
          user={user}
          handleCommentOpen={handleCommentOpen}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default CommentList
