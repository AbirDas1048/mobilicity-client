import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { FaCheckCircle } from 'react-icons/fa';
import useBuyer from '../../../Hooks/useBuyer';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';

const Product = ({ product, setProductData, from }) => {
    const { image, productName, price, originalPrice, description, location, condition, usesYear, seller, postedOn } = product;
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [showModalButton, setShowModalButton] = useState(false);
    const [productLoading, setProductLoading] = useState(true);

    const [showReportButton, setShowReportButton] = useState(false);
    const [reportLoading, setReportLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/buyer/bookingsCheck?buyerEmail=${user?.email}&productId=${product?._id}`)
            .then(res => res.json())
            .then(data => {
                setShowModalButton(data.acknowledged);
                setProductLoading(false);
            })
    }, [user?.email, product?._id])

    useEffect(() => {
        fetch(`http://localhost:5000/buyer/reportsCheck?buyerEmail=${user?.email}&productId=${product?._id}`)
            .then(res => res.json())
            .then(data => {
                setShowReportButton(data.acknowledged);
                setReportLoading(false);
            })
    }, [user?.email, product?._id])


    if (productLoading && reportLoading) {
        return <Loading></Loading>
    }

    const handleReport = (reportedItem) => {
        const report = {
            buyerName: user.displayName,
            buyerEmail: user.email,
            productId: reportedItem._id,
            productName: reportedItem.productName
        }

        //console.log(report);

        fetch('http://localhost:5000/buyer/reportToAdmin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.acknowledged) {
                    setProductData(null);
                    toast.success('Report submit successfully');
                } else {
                    toast.error(data.message);
                }

            })
    }



    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className='pt-10'><img src={image} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {productName}
                    <div className="badge badge-secondary">{condition}</div>
                </h2>
                <p>Resale Price: ${price}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>{description}</p>
                <p>Location: {location}</p>
                {
                    isBuyer && from === 'products' &&
                    <>
                        <p>Year of use: {usesYear}</p>
                        <div className='flex justify-start items-center'>
                            <p className='flex-grow-0 mr-3'>Seller: {seller[0].name} </p>
                            <p>{seller[0].verified ? <FaCheckCircle className='text-blue-500 text-xl'></FaCheckCircle> : ''}</p>
                        </div>
                        <p>Posted on: {postedOn}</p>
                        <div className="card-actions justify-center">
                            {
                                showReportButton
                                    ?
                                    <button className='btn btn-sm btn-warning' disabled>Already Reported</button>
                                    :
                                    <button onClick={() => handleReport(product)} className='btn btn-sm btn-warning'>Report to Admin</button>
                            }
                            <label disabled={showModalButton === true} htmlFor="booking-modal" className="btn btn-sm btn-accent" onClick={() => setProductData(product)} >Book Now</label>
                        </div>
                    </>
                }


            </div>
        </div>
    );
};

export default Product;