import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div style={{
            scrollBehavior: 'smooth', scrollPaddingTop: '5rem'
        }}>
            <Navbar></Navbar>
            <div className='max-w-[1000px] mx-auto'>
                <Outlet></Outlet>
            </div>
            {/* <Outlet></Outlet> */}

            <Footer></Footer>
        </div>
    );
};

export default Main;