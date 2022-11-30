import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookNow from '../BookNow/BookNow';
import Product from './Product';

const Products = () => {
    const loadedData = useLoaderData();
    const { products, category } = loadedData;
    const [productData, setProductData] = useState(null);

    return (
        <div>
            <h2 className='my-3 text-center text-3xl'>All Products of {category.name}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <Product key={product._id} product={product} setProductData={setProductData} from="products"></Product>)
                }
                {
                    productData && <BookNow productData={productData} setProductData={setProductData} ></BookNow>
                }
            </div>
        </div>
    );
};

export default Products;