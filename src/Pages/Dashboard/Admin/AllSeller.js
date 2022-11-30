import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/Modal/ConfirmationModal';

const AllSeller = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);
    const closeModal = () => {
        setDeletingSeller(null);
    }
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://mobilicity-server.vercel.app/admin/sellers', {
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

    const handleDelete = seller => {
        fetch(`https://mobilicity-server.vercel.app/admin/sellers/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Seller ${seller.name} Deleted Successfully`);
                }

            })
    }

    const handleVerify = (id) => {
        //console.log(id);
        fetch(`https://mobilicity-server.vercel.app/admin/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Successfully Updated');
                    refetch();
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl text-center my-3'>All Sellers</h2>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.length > 0 ?
                                sellers.map((seller, i) =>
                                    <tr key={seller._id}>
                                        <th>{++i}</th>
                                        <td>{seller.name}</td>
                                        <td className='text-center'>{seller.email}</td>
                                        <td className='text-center'>
                                            {
                                                seller?.verified ?
                                                    <p className='text-success font-bold'>Verified</p>
                                                    :
                                                    <button onClick={() => handleVerify(seller._id)} className='btn btn-xs btn-warning'>Make verified</button>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                        </td>
                                    </tr>)
                                :
                                <tr>
                                    <td className='text-center' colSpan="5">No Data Available</td>
                                </tr>
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.name}. It cannot be undone`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}>

                </ConfirmationModal>
            }
        </div>
    );
};

export default AllSeller;