import React from 'react';

const PageNotFound = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
        </div>
    );
};

export default PageNotFound;