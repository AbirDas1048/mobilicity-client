import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { FaCheckCircle } from 'react-icons/fa';
import useBuyer from '../../../Hooks/useBuyer';

const Product = ({ product }) => {
    const { image, productName, price, originalPrice, description, location, condition, usesYear, seller, postedOn } = product;
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
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

                {/* <p>Year of use: {usesYear}</p>
                <div className='flex justify-start items-center'>
                    <p className='flex-grow-0 mr-3'>Seller: {seller[0].name} </p>
                    <p>{seller[0].verified ? <FaCheckCircle className='text-blue-500 text-xl'></FaCheckCircle> : ''}</p>
                </div>
                <p>Posted on: {postedOn}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-sm btn-accent">Book Now</button>
                </div> */}
                {
                    isBuyer &&
                    <>
                        <p>Year of use: {usesYear}</p>
                        <div className='flex justify-start items-center'>
                            <p className='flex-grow-0 mr-3'>Seller: {seller[0].name} </p>
                            <p>{seller[0].verified ? <FaCheckCircle className='text-blue-500 text-xl'></FaCheckCircle> : ''}</p>
                        </div>
                        <p>Posted on: {postedOn}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-sm btn-accent">Book Now</button>
                        </div>
                    </>
                }


            </div>
        </div>
    );
};

export default Product;