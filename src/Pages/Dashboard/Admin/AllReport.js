import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/Modal/ConfirmationModal';

const AllReport = () => {
    const [deleteReportedItem, setDeleteReportedItem] = useState(null);
    const closeModal = () => {
        setDeleteReportedItem(null);
    }
    const { data: reports, isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/admin/reports', {
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

    const handleDelete = report => {
        fetch(`http://localhost:5000/admin/deleteReportedItem/${report.productId}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Product ${report.productName} Deleted Successfully`);
                }

            })
    }
    return (
        <div>
            <h2 className='text-3xl text-center my-3'>All Reports</h2>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th className='text-center'>Reported User Email</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.length > 0 ?
                                reports.map((report, i) =>
                                    <tr key={report._id}>
                                        <th>{++i}</th>
                                        <td>{report.productName}</td>
                                        <td className='text-center'>{report.buyerEmail}</td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeleteReportedItem(report)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
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
                deleteReportedItem && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deleteReportedItem.productName}. It cannot be undone`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deleteReportedItem}
                    closeModal={closeModal}>

                </ConfirmationModal>
            }
        </div>
    );
};

export default AllReport;