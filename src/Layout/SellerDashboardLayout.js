import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useSeller from '../Hooks/useSeller';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const SellerDashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
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
                            isSeller &&
                            <>
                                <li><Link to='/sellerDashboard/addProduct'>Add Product</Link></li>
                                <li><Link to='/sellerDashboard/myProduct'>My Product</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardLayout;