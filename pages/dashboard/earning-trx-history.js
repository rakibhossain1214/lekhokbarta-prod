import DashboardLayout from '@/layouts/DashboardLayout';
import { getUserInfo } from '@/lib/firestoreConnection';
import React, { useEffect, useState } from 'react';
import { withProtected } from 'src/hook/route';

function EarningTrxHistory({ auth }) {
    const { user } = auth
    const [userInfo, setUserInfo] = useState(user)
    
    useEffect(() => {
        async function getUser() {
            const userData = await getUserInfo(user.uid)
            setUserInfo(userData)
        }
        getUser()
    }, [])

    return (
        <DashboardLayout userInfo={userInfo}>
            <div className="relative overflow-x-auto">

                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 mt-4">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-2">
                                #
                            </th>
                            <th scope="col" className="py-3 px-6">
                                amount
                            </th>
                            <th scope="col" className="py-3 px-6">
                                account type
                            </th>
                            <th scope="col" className="py-3 px-6">
                                gateway
                            </th>
                            <th scope="col" className="py-3 px-6">
                                account no
                            </th>
                            <th scope="col" className="py-3 px-6">
                                request date
                            </th>
                            <th scope="col" className="py-3 px-6">
                                processing date
                            </th>
                            <th scope="col" className="py-3 px-6">
                                trx id
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <td className="py-4 px-2">1</td>
                            <td className="py-4 px-6">100</td>
                            <td className="py-4 px-6">personal</td>
                            <td className="py-4 px-6">bkash</td>
                            <td className="py-4 px-6">01714459529</td>
                            <td className="py-4 px-6">25/08/22</td>
                            <td className="py-4 px-6">26/08/22</td>
                            <td className="py-4 px-6">12341321231</td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </DashboardLayout>
    );
}

export default withProtected(EarningTrxHistory);