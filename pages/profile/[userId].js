import React, { useEffect, useState } from 'react';
import { withProtected } from 'src/hook/route';
import { getUserInfo } from '@/lib/firestoreConnection'
import { Tab } from '@headlessui/react'
import Image from '@/components/Image';
import ProfileDetails from '@/components/ProfileDetails';
import Followers from '@/components/Followers';
import Background from '../../public/static/images/profile_bg.jpg'
import { useRouter } from 'next/router'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'

function profile({ auth }) {
    const { user } = auth
    const router = useRouter()
    const { userId } = router.query

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        async function getUser() {
            const userData = await getUserInfo(userId)
            setUserInfo(userData)
        }
        return getUser();
    }, [])

    if (userInfo === null) {
        return <>loading...</>
    }


    const handleChange = (values) => {
        setUserInfo({ ...userInfo, ...values })
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
                                <Image
                                    src={userInfo.photoURL}
                                    width="60px"
                                    height="60px"
                                    alt="avatar"
                                    className="rounded-full border-none align-middle shadow-lg"
                                />
                                {userId === user.uid &&
                                    <button className='flex items-start -ml-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rounded-full text-teal-500 bg-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
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
                            {userId !== user.uid &&
                                <button
                                    className='text-xs text-gray-100 flex pl-2 pr-2 m-1 border border-gray-200 bg-teal-500 rounded items-center'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                    </svg>
                                    Follow
                                </button>
                            }
                            {/* <Button
                          variant="outlined"
                          color="accent"
                          style={{ fontSize: '10px', }}
                          startIcon={<DoneAllIcon />}
                        >
                          Following
                        </Button> */}
                            {userId === user.uid &&
                                <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    (10000)
                                </p>
                            }
                            <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                (10000)
                            </p>
                            <p className='text-xs md:text-xs text-gray-100 border-b border-teal-500 m-1 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                (10000)
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
                                About
                            </Tab>

                            {userId === user.uid &&
                                <Tab
                                    className={({ selected }) =>
                                        selected ? 'bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                    }
                                >
                                    Follower(1000)
                                </Tab>
                            }

                            {userId === user.uid &&
                                <Tab
                                    className={({ selected }) =>
                                        selected ? 'bg-teal-500 text-white inline-block pl-4 pr-4 pt-2 pb-2 text-white-600 rounded-t-lg active dark:bg-teal-500 dark:text-white-500' : 'inline-block pl-4 pr-4 pt-2 pb-2 text-gray-500 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-gray-400'
                                    }
                                >
                                    Following(500)
                                </Tab>
                            }

                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel><ProfileDetails handleChange={handleChange} userInfo={userInfo} userId={userId} user={user} /> </Tab.Panel>
                            <Tab.Panel><Followers userInfo={userInfo} /></Tab.Panel>
                            <Tab.Panel>Content 3</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div>
            </div>
        </>
    );
}

export default withProtected(profile);