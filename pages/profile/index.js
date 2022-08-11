import React, { useEffect, useState } from 'react';
import { withProtected } from 'src/hook/route';
import { getUserInfo } from '@/lib/firestoreConnection'

function profile({ auth }) {
    const { user } = auth

    const [userInfo, setUserInfo] = useState(user)

    useEffect(() => {
        async function getUser() {
            const userData = await getUserInfo(user.uid)
            setUserInfo(userData)
        }
        return getUser();      
    }, [])

    return (
        <div>
           <div className='bg-gray-200'>
                <div className='p-10'>
                    <div className='w-full px-32 pt-32 pb-48 bg-white'>
                        <div className='flex justify-end'>
                            <button className='px-8 py-4 text-2xl text-white bg-blue-500 border-0'>
                                Follow
                            </button>
                        </div>
                        <div className='flex'>
                            <div className='w-64 h-64 mr-10 bg-green-500'>
                                <img className='h-64 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&usqp=CAU"/>
                            </div>
                            <div className='flex flex-col'>
                                <span className='mb-6 text-5xl'>Lottie Dixon</span>
                                <span className='mb-6 text-2xl'>Lottie Dixon</span>
                                <span className='mb-6 text-5xl'>Lottie Dixon</span>
                                <span className='text-5xl text-blue-500'>Lottie Dixon</span>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default withProtected(profile);