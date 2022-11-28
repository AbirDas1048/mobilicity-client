import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllBuyer from "../Pages/Dashboard/Admin/AllBuyer";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import Home from "../Pages/Home/Home/Home";
import DisplayError from "../Pages/Shared/Error/DisplayError";
import PageNotFound from "../Pages/Shared/Error/PageNotFound";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/*',
                element: <PageNotFound></PageNotFound>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/allBuyer',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/allSeller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            // {
            //     path: '/dashboard/allUsers',
            //     element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            // },
            // {
            //     path: '/dashboard/addDoctor',
            //     element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            // },
            // {
            //     path: '/dashboard/manageDoctors',
            //     element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            // },
            // {
            //     path: '/dashboard/payment/:id',
            //     loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`),
            //     element: <Payment></Payment>

            // },
        ]
    }
])

export default router;