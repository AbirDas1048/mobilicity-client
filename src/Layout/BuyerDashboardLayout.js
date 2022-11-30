import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useBuyer from '../Hooks/useBuyer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const BuyerDashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="m-4 flex justify-end">
                        <label htmlFor="dashboard-drawer" className="btn btn-xs btn-accent drawer-button">Open dashboard menu</label>
                    </div>
                    <div className="px-10">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        {
                            isBuyer &&
                            <>
                                <li><Link to='/buyerDashboard/myOrder'>My Order</Link></li>
                                {/* <li><Link to='/buyerDashboard/myWishlist'>My Wishlist</Link></li> */}
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboardLayout;