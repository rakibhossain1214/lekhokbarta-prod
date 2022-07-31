import React from 'react';
import { withPublic } from '../src/hook/route'

function CommentBox({ auth }) {
    const { user } = auth

    if (user === null) {
        return <>Please Log in to comment...</>
    }
    return (
        <div className="w-full bg-white dark:bg-gray-900 pt-3 mt-1 rounded shadow-lg">

            <div className="flex ml-3">
                <div className="mr-3">
                    <img src={user.photoURL} alt="" className='rounded-full' style={{ width: '40px' }} />
                </div>
                <div>
                    <h4 className="font-semibold">{user.displayName}</h4>
                    <p className="text-xs text-gray-500">2 seconds ago</p>
                </div>

            </div>

            <div className="mt-3 p-1 w-full">
                <textarea rows="3" className="border p-2 rounded w-full dark:bg-gray-900" placeholder="Leave a comment..."></textarea>
            </div>

            <div className='flex justify-end'>
                <div className="text-base font-medium leading-6">
                    <button className="focus:shadow-outline-teal mx-1 inline rounded-lg border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
                        Comment
                    </button>
                </div>
            </div>
        </div>

    );
}

export default withPublic(CommentBox);
