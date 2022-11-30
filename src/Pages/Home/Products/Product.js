import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { FaCheckCircle } from 'react-icons/fa';
import useBuyer from '../../../Hooks/useBuyer';
import Loading from '../../Shared/Loading/Loading';

const Product = ({ product, setProductData, from }) => {
    const { image, productName, price, originalPrice, description, location, condition, usesYear, seller, postedOn } = product;
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [showModalButton, setShowModalButton] = useState(false);
    const [productLoading, setProductLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/buyer/bookingsCheck?buyerEmail=${user?.email}&productId=${product?._id}`)
            .then(res => res.json())
            .then(data => {
                setShowModalButton(data.acknowledged);
                setProductLoading(false);
            })
    }, [user?.email, product?._id])


    if (productLoading) {
        return <Loading></Loading>
    }


    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className='pt-10'><img src={image} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {productName}
                    <div className="badge badge-secondary">{condition}</div>
                </h2>
                <p>Resale Price: {price}TK</p>
                <p>Original Price: {originalPrice}TK</p>
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

                            <label disabled={showModalButton === true} htmlFor="booking-modal" className="btn btn-sm btn-accent" onClick={() => setProductData(product)} >Book Now</label>
                        </div>
                    </>
                }


            </div>
        </div>
    );
};

export default Product;