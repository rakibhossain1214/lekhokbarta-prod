import React, { useEffect, useState } from 'react';
import { withPublic } from '../src/hook/route'
import CommentOptions from './CommentOptions'
import Moment from 'react-moment'
import 'moment-timezone'
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore'
import Image from '@/components/Image'
import UpArrow from '../public/static/images/up-arrow.png'
import DownArrow from '../public/static/images/down-arrow.png'
import { increaseVote, decreaseVote } from '@/lib/firestoreConnection'

function CommentList({ postId, auth }) {
    const { user } = auth;
    // console.log("User: ", user)
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)

    const db = getFirestore()
    const postRef = doc(db, 'posts', postId)

    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(postRef, (doc) => {
            setPostData(doc.data())
        });
    }, [])

    useEffect(() => {
        const unsub1 = onSnapshot(postRef, (doc) => {
            doc.data()?.upVote.map(item => {
                if(item === user.uid){
                    setUpVoted(true)
                }else{
                    setUpVoted(false)
                }
            })
        });
        
    }, [])

    useEffect(() => {
        const unsub2 = onSnapshot(postRef, (doc) => {
            doc.data()?.downVote.map(item => {
                if(item === user.uid){
                    setDownVoted(true)
                }else{
                    setDownVoted(false)
                }
            })
        });
        
    }, [])

    if (postData === null) {
        return <>Loading...</>
    }

    const handleUpvote = () => {
        setUpVoted(!upVoted);
        increaseVote({ postId: postId, uid: user.uid, postData: postData }) 
    }

    const handleDownVote = () => {
        setDownVoted(!downVoted)
        decreaseVote({ postId: postId, uid: user.uid, postData: postData }) 
    }

    
        return (
            <div className='bg-white dark:bg-stone-800'>
                <h4 className='p-2'>
                    <button onClick={handleUpvote}>
                        <Image
                            src={UpArrow}
                            width="32px"
                            height="32px"
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                        />{ upVoted ? "Voted": "Up vote"}
                    </button><span> ( {postData.upVote.length} ) </span> |
                    <button className='pl-4' onClick={handleDownVote}>
                        <Image
                            src={DownArrow}
                            width="32px"
                            height="32px"
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                        />{ downVoted ? "Voted": "Down vote"}
                    </button><span> ( {postData.downVote.length} ) </span> |
                    <button className='pl-4'> Comments </button><span> ( {postData.comments.length} ) </span>
                </h4>
                {postData.comments.map((comment, i) => (
                    <div key={i++} className="w-full bg-white dark:bg-gray-900 pt-3 rounded shadow-lg">
                        <div className="flex ml-3">
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
                                <p className="text-xs text-gray-500"><Moment fromNow>{comment.modifiedAt}</Moment></p>
                            </div>
                            <CommentOptions />
                        </div>

                        <div className="mt-1 p-1 w-full">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{comment.commentText}</p>
                        </div>

                    </div>
                ))}

            </div>

        );
   
}


export default withPublic(CommentList);

