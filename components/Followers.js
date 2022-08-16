import React from 'react';
import Image from '@/components/Image';

function Followers({userInfo}) {
    return (
        <div className='w-full'>
            <table className="table-auto p-4 m-4">
                <thead>
                    <tr>
                        {/* <th>Image</th> */}
                        {/* <th>Name & Profile Link</th> */}
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Image
                                src={userInfo.photoURL}
                                width="32px"
                                height="32px"
                                alt="avatar"
                                className="rounded-full border-none align-middle shadow-lg"
                            />
                        </td>
                        <td className='pl-2 pb-1'>
                            {userInfo.displayName}
                        </td>
                        <td className='pl-2'>
                            <button className='border border-red-400 p-1 rounded text-xs text-red-400'>
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Followers