import React from 'react';
import { withPublic } from '../src/hook/route'
import CommentOptions from './CommentOptions'

function CommentBox({ auth }) {
    const { user } = auth

    return (
        <div className="w-full bg-white dark:bg-gray-900 pt-3 rounded shadow-lg">

            <div className="flex ml-3">
                <div className="mr-3">
                    <img src={user.photoURL} alt="" className='rounded-full' style={{ width: '40px' }} />
                </div>
                <div>
                    <h4 className="font-semibold">{user.displayName}</h4>
                    <p className="text-xs text-gray-500">2 seconds ago</p>
                </div>
                <CommentOptions />
            </div>

            <div className="mt-1 p-1 w-full">
                <p className="text-sm text-gray-500">ists are a simple way of displaying data and elements in a table format. Tailwind List category has a collection of 19 different components for static and dynamic elements. Tailwind List components can be used in web applications and dashboards for the purpose of arranging</p>
                {/* <textarea rows="3" className="border p-2 rounded w-full" placeholder="Leave a comment..."></textarea> */}
            </div>

        </div>

    );
}

export default withPublic(CommentBox);
