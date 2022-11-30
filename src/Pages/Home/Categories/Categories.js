import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import Category from './Category';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, []);

    if (!categories) {
        return <Loading></Loading>
    }

    return (
        <div className='my-5'>
            <h2 className='my-3 text-center text-3xl'>All Brands</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {
                    categories.map(category => <Category key={category._id} category={category} ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;