import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    return (
        <div className="card p-5 bg-base-100 shadow-xl items-center justify-center">
            <figure className='w-24 rounded'>
                <Link to={`/categories/${category._id}`}><img src={category.image} alt="" /></Link>

            </figure>
            {/* <div className="card-body">
                <h2 className="card-title">
                    {category.name}
                </h2>
            </div> */}
            {/* <div className="card-actions justify-center">
                <Link to={`/categories/${category._id}`}><button className='btn btn-sm btm-primary'>Show All Product</button></Link>
            </div> */}
        </div>
    );
};

export default Category;