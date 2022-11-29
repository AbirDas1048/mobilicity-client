import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

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
        <div className='text-center'>
            <h2 className='text-xl text-center mb-2'>All Category</h2>
            <ul className="menu menu-horizontal lg:menu-vertical bg-base-100 rounded-box">
                {
                    categories.map(category => <li key={category._id} className="border "><Link to="">{category.name}</Link></li>)
                }
            </ul>
        </div>
    );
};

export default Categories;