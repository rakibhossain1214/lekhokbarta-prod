import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PageTitle from './PageTitle';

function NoPermission() {
    const [permission, setPermission] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setPermission(false)
        }, 3000)
    }, [])


    if(permission){
        return (
            <div className="mt-24 text-center">
                <PageTitle>
                    Checking permission...
                </PageTitle>
            </div>
        )
    }

    return (
        <>
            <div className="mt-24 text-center">
                <PageTitle>
                    You dont have permission!{' '}
                    <span role="img" aria-label="roadwork sign">
                        🚧
                    </span>
                </PageTitle>
                <Link href="/">
                    <button className="focus:shadow-outline-blue my-5 inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
                        Back to homepage
                    </button>
                </Link>
            </div>
        </>
    );
}

export default NoPermission;