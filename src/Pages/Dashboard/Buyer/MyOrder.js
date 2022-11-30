import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyOrder = () => {
    const { user } = useContext(AuthContext);
    //const [deletingProduct, setDeletingProduct] = useState(null);
    // const closeModal = () => {
    //     setDeletingProduct(null);
    // }
    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/buyers/orders?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (errors) {

            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }


    // const handleDelete = product => {
    //     fetch(`http://localhost:5000/sellers/products/${product._id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 refetch();
    //                 toast.success(`${product.productName} Deleted Successfully`);
    //             }

    //         })
    // }

    // const handleAdvertise = (id) => {
    //     //console.log(id);
    //     fetch(`http://localhost:5000/sellers/products/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.modifiedCount > 0) {
    //                 toast.success('Successfully Updated');
    //                 refetch();
    //             }
    //         })
    // }
    return (
        <div>
            <h2 className='text-3xl text-center my-3'>My Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Pay Status</th>
                            {/* <th className='text-center'>Sales Status</th>
                            <th className='text-center'>Advertised Status</th>
                            <th className='text-center'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ?
                                orders.map((order, i) =>
                                    <tr key={order._id}>
                                        <th>{++i}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-24 rounded">
                                                    <img src={order.productInfo[0].image} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{order.productName}</td>
                                        <td className='text-center'>{order.price}</td>
                                        <td className='text-center'>
                                            {
                                                order.price && !order.paid && <Link
                                                    to={`/buyerDashboard/payment/${order._id}`}>
                                                    <button
                                                        className='btn btn-sm btn-primary'>Pay
                                                    </button>
                                                </Link>
                                            }
                                            {
                                                order.price && order.paid && <span
                                                    className='text-green-500'>Paid
                                                </span>
                                            }
                                        </td>
                                        {/* <td>
                                            {
                                                booking.price && !booking.paid && <Link
                                                    to={`/dashboard/payment/${booking._id}`}>
                                                    <button
                                                        className='btn btn-sm btn-primary'>Pay
                                                    </button>
                                                </Link>
                                            }
                                            {
                                                booking.price && booking.paid && <span
                                                    className='text-green-500'>Paid
                                                </span>
                                            }
                                        </td> */}
                                        {/* <td className='text-center'>
                                            {
                                                product?.availability ?
                                                    <p className='badge badge-primary'>Available</p>
                                                    :
                                                    <p className='badge badge-success'>Sold</p>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            {
                                                product?.advertise ?
                                                    <p className='badge badge-info uppercase font-bold'>Advertised</p>
                                                    :
                                                    <button onClick={() => handleAdvertise(product._id)} className='btn btn-xs btn-warning'>Make Advertised</button>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                        </td> */}
                                    </tr>)
                                :
                                <tr>
                                    <td className='text-center' colSpan="7">No Data Available</td>
                                </tr>
                        }

                    </tbody>
                </table>
            </div>
            {/* {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.productName}. It cannot be undone`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}>

                </ConfirmationModal>
            } */}
        </div>
    );
};

export default MyOrder;