import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {
    const loadedData = useLoaderData();
    const { products, category } = loadedData;
    return (
        <div>
            <h2 className='my-3 text-center text-3xl'>All Products of {category.name}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <Product key={product._id} product={product} ></Product>)
                }
            </div>
        </div>
    );
};

export default Products;