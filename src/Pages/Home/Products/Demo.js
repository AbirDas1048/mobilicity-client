import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Demo = () => {
    const products = useLoaderData();
    console.log(products);
    return (
        <div>
            <h2>This is Demo</h2>
        </div>
    );
};

export default Demo;