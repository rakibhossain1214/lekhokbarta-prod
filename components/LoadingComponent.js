import Image from 'next/image';
import React from 'react';

function LoadingComponent() {
    return (
        <div className="grid place-content-center h-screen w-full dark:bg-gray-900">
          <div className='flex items-center'>
            <Image
              src='/static/images/gif/rhombus.gif'
              width={64}
              height={64}
            />
            <h2 className='text-teal-500 ml-2'>Please wait...</h2>
          </div>  
        </div>
    );
}

export default LoadingComponent;