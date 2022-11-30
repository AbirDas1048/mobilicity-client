import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/Modal/ConfirmationModal';

const AllBuyer = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const closeModal = () => {
        setDeletingBuyer(null);
    }
    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://mobilicity-server.vercel.app/admin/buyers', {
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

    const handleDelete = buyer => {
        fetch(`https://mobilicity-server.vercel.app/admin/buyers/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Buyer ${buyer.name} Deleted Successfully`);
                }

            })
    }
    return (
        <div>
            <h2 className='text-3xl text-center my-3'>All Buyers</h2>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.length > 0 ?
                                buyers.map((buyer, i) =>
                                    <tr key={buyer._id}>
                                        <th>{++i}</th>
                                        <td>{buyer.name}</td>
                                        <td className='text-center'>{buyer.email}</td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                        </td>
                                    </tr>)
                                :
                                <tr>
                                    <td className='text-center' colSpan="4">No Data Available</td>
                                </tr>
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyer.name}. It cannot be undone`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}>

                </ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyer;