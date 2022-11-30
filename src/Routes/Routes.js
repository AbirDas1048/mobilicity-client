import { createBrowserRouter } from "react-router-dom";
import BuyerDashboardLayout from "../Layout/BuyerDashboardLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import SellerDashboardLayout from "../Layout/SellerDashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Blogs from "../Pages/Blogs/Blogs";
import AllBuyer from "../Pages/Dashboard/Admin/AllBuyer";
import AllReport from "../Pages/Dashboard/Admin/AllReport";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import MyOrder from "../Pages/Dashboard/Buyer/MyOrder";
import Payment from "../Pages/Dashboard/Buyer/Payment/Payment";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProduct from "../Pages/Dashboard/Seller/MyProduct";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Home/Products/Products";
import DisplayError from "../Pages/Shared/Error/DisplayError";
import PageNotFound from "../Pages/Shared/Error/PageNotFound";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({ params }) => fetch(`https://mobilicity-server.vercel.app/categories/${params.id}`)
            },
            {
                path: '/*',
                element: <PageNotFound></PageNotFound>
            },
        ]
    },
    {
        path: '/adminDashboard',
        element: <PrivateRoute><AdminRoute><DashboardLayout></DashboardLayout></AdminRoute></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/adminDashboard',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/adminDashboard/allBuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/adminDashboard/allSeller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/adminDashboard/allReport',
                element: <AdminRoute><AllReport></AllReport></AdminRoute>
            },
        ]
    },
    {
        path: '/sellerDashboard',
        element: <PrivateRoute><SellerRoute><SellerDashboardLayout></SellerDashboardLayout></SellerRoute></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/sellerDashboard',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/sellerDashboard/addProduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/sellerDashboard/myProduct',
                element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
        ]
    },
    {
        path: '/buyerDashboard',
        element: <PrivateRoute><BuyerRoute><BuyerDashboardLayout></BuyerDashboardLayout></BuyerRoute></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/buyerDashboard',
                element: <BuyerRoute><MyOrder></MyOrder></BuyerRoute>
            },
            {
                path: '/buyerDashboard/myOrder',
                element: <BuyerRoute><MyOrder></MyOrder></BuyerRoute>
            },
            {
                path: '/buyerDashboard/payment/:id',
                loader: ({ params }) => fetch(`https://mobilicity-server.vercel.app/buyer/productPayment/${params.id}`),
                element: <BuyerRoute><Payment></Payment></BuyerRoute>

            },

        ]
    }
])

export default router;