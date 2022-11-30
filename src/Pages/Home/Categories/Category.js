import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    return (
        <div className="card p-5 bg-base-100 shadow-xl items-center justify-center">
            <figure className='w-24 rounded'>
                <Link to={`/categories/${category._id}`}><img src={category.image} alt="" /></Link>

            </figure>
        </div>
    );
};

export default Category;