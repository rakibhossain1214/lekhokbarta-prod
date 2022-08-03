import DashboardLayout from '@/layouts/DashboardLayout';
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
    }, [])

    return (
        <DashboardLayout userInfo={userInfo}>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700 my-10">
                <div className="rounded-t mb-0 px-4 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                                {/* Update Profile */}
                            </h6>
                            <h2 className="text-blueGray-100 text-xl font-semibold">Profile</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative">
                        <div>
                            Profile update form here...
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default withProtected(profile);

