import React, { useEffect, useState } from 'react';
import { withPublic } from 'src/hook/route';
import { AddFollower, deleteFollower, getAllPostsByAuthorId, getUserInfo } from '@/lib/firestoreConnection'
import { Tab } from '@headlessui/react'
import Image from '@/components/Image';
import ProfileDetails from '@/components/ProfileDetails';
import Followers from '@/components/Followers';
import Following from '@/components/Following';
import Background from '../../public/static/images/profile_bg.jpg'
import { useRouter } from 'next/router'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import Compressor from 'compressorjs'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import FavBlogs from '@/components/FavBlogs';
import MyBlogs from '@/components/MyBlogs';

const storage = getStorage()
const metadata = {
    contentType: 'image/jpeg',
}
const db = getFirestore()

function profile({ auth, userData, myBlogsList }) {
    const { user, setUser } = auth
    const router = useRouter()
    const { userId } = router.query

    const [imageLoad, setImageLoad] = useState(false)
    const [userInfo, setUserInfo] = useState(userData)
    const [showFollowButton, setShowFollowButton] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    const [userBlogs, setUserBlogs] = useState(myBlogsList)

    useEffect(() => {
        async function getUser() {
            setProcessing(true)

            setFollowersCount(userData?.followers?.length)

            userData?.followers?.map(follower => {
                if (follower.uid === user?.uid) {
                    setShowFollowButton(false)
                }
            })
            setProcessing(false)
        }
        getUser();
    }, [])

    const handleChange = (values) => {
        setUserInfo({ ...userInfo, ...values })
    }

    const handleFollowChange = ({ userData }) => {
        setUserInfo(userData)
    }
    
    const handleMyBlogChange = ({ userBlogsList }) => {
        setUserBlogs(userBlogsList)
    }


    const handleFollow = () => {
        setShowFollowButton(false)
        setProcessing(true)
        setFollowersCount(followersCount + 1)
        if (userInfo !== null) {
            AddFollower({ userInfo, user }).then(async () => {
                setProcessing(false)
            })
        }
    }

    const deleteFollow = () => {
        setShowFollowButton(true)
        setProcessing(true)
        setFollowersCount(followersCount - 1)
        if (userInfo !== null) {
            deleteFollower({ userInfo, user }).then(async () => {
                setProcessing(false)
            })
        }
    }

    function handleImageUploadBefore(files) {
        const storageRef = ref(storage, 'avatars/' + userId + '/' + userId)
        const image = files[0]

        setImageLoad(true)

        new Compressor(image, {
            quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                // compressedResult has the compressed file.
                const uploadTask = uploadBytesResumable(storageRef, compressedResult, metadata)
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done')
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused')
                                break
                            case 'running':
                                console.log('Upload is running')
                                break
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break
                            case 'storage/canceled':
                                // User canceled the upload
                                break
                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const userRef = doc(db, 'users', userId)
                            updateDoc(userRef, { photoURL: downloadURL }).then(() => {
                                setUserInfo({ ...userInfo, photoURL: downloadURL })
                                setImageLoad(false)
                            })
                        })
                    }
                )
            },
        })
    }

    if (userInfo === "NODATA") {
        return <>
            <div className="mt-24 text-center">
                <PageTitle>
                    No User Found! {' '}
                    <span role="img" aria-label="roadwork sign">
                        🚧
                    </span>
                </PageTitle>
                <Link href="/">
                    <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 my-5 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
                        Back to homepage
                    </button>
                </Link>
            </div>
        </>
    }

    return (
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className='flex flex-wrap flex-row w-full p-8' style={{ backgroundImage: `url(${Background.src})`, width: '100%', height: '100%' }}>
                    <div>
                        {userInfo !== null ? (
                            <div className='flex'>
                                {imageLoad ?
                                    <div style={{ height: '60px', width: '60px' }} className="align-middle">
                                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>

                                    :
                                    <Image
                                        src={userInfo.photoURL}
                                        width="60px"
                                        height="60px"
                                        alt="avatar"
                                        className="rounded-full border-none align-middle shadow-lg"
                                    />
                                }

                                {
                                    user !== null &&
                                    userId === user.uid &&
                                    <button className='flex items-start -ml-2 overflow-hidden relative w-5 h-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 rounded-full text-teal-500 bg-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                        </svg>
                                        <input className="cursor-pointer absolute opacity-0 block pin-r pin-t" type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={(event) => {
                                                handleImageUploadBefore(event.target.files)
                                            }}
                                        />
                                    </button>
                                }
                            </div>
                        ) : (
                            'User Avatar'
                        )}
                    </div>
                    <div className='pl-1 pt-1 md:p-2'>
                        <p className='text-md text-gray-100'>{userInfo !== null ? userInfo.displayName : ''}</p>
                        <p className='text-sm text-gray-100'>{userInfo !== null ? userInfo.email : ''}</p>
                        <div className='flex mt-4'>
                            {
                                user !== null ?
                                    userId !== user.uid ?
                                        showFollowButton ?
                                            <button
                                                disabled={processing}
                                                onClick={handleFollow}
                                                className='text-xs text-gray-100 flex pl-2 pr-2 m-1 border border-gray-200 bg-teal-500 rounded items-center'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                </svg>
                                                Follow
                                            </button>
                                            :
                                            <button
                                                disabled={processing}
                                                onClick={deleteFollow}
                                                className='text-xs text-gray-600 flex pl-2 pr-2 pt-1 pb-1 m-1 border border-gray-200 bg-gray-300 rounded items-center'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                </svg>
                                                Unfollow
                                            </button>
                                        :
                                        ''
                                    :
                                    ''
                            }

                            <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {userInfo.authorScore}
                            </p>

                            <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                {followersCount}
                            </p>

                            <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {userInfo.following.length}
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <Tab.Group>
                        <Tab.List className="flex flex-wrap mt-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">

                            <Tab
                                className={({ selected }) =>
                                    selected ? 'bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </Tab>

                            <Tab
                                className={({ selected }) =>
                                    selected ? 'flex bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'flex inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                }
                            >
                                <Image
                                    src='/static/images/blogging.png'
                                    width={22}
                                    height={22}
                                />
                            </Tab>

                            {user !== null &&
                                userId === user.uid &&
                                <Tab
                                    className={({ selected }) =>
                                        selected ? 'flex bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'flex inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                </Tab>
                            }

                            {user !== null &&
                                userId === user.uid &&
                                <Tab
                                    className={({ selected }) =>
                                        selected ? 'flex bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'flex inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </Tab>
                            }

                            {user !== null &&
                                userId === user.uid &&
                                <Tab
                                    className={({ selected }) =>
                                        selected ? 'flex bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'flex inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                    }
                                >
                                    <Image
                                        src='/static/images/heart-red.png'
                                        width={22}
                                        height={22}
                                    />
                                </Tab>
                            }
                        </Tab.List>
                        <Tab.Panels>

                            <Tab.Panel><ProfileDetails handleChange={handleChange} userInfo={userInfo} userId={userId} user={user} setUser={setUser} /></Tab.Panel>

                            <Tab.Panel><MyBlogs userInfo={userInfo} userBlogs={userBlogs} userId={userId} user={user} handleMyBlogChange={handleMyBlogChange} /></Tab.Panel>

                            {user !== null &&
                                userId === user.uid &&
                                <Tab.Panel><Followers userInfo={userInfo} userId={userId} user={user} handleFollowChange={handleFollowChange} /></Tab.Panel>
                            }

                            {user !== null &&
                                userId === user.uid &&
                                <Tab.Panel><Following userInfo={userInfo} userId={userId} user={user} handleFollowChange={handleFollowChange} /></Tab.Panel>
                            }

                            {user !== null &&
                                userId === user.uid &&
                                <Tab.Panel><FavBlogs userInfo={userInfo} userId={userId} handleFollowChange={handleFollowChange} setUser={setUser} /></Tab.Panel>
                            }

                        </Tab.Panels>
                    </Tab.Group>

                </div>
            </div>
        </>
    );
}

export default withPublic(profile);

export async function getServerSideProps({ params }) {
    const userData = await getUserInfo(params.userId)
    const userBlogs = await getAllPostsByAuthorId({ authorId: params.userId })
    return {
        props: { userData, myBlogsList: userBlogs }
    }
}