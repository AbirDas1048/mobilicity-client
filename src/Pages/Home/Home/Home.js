import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Categories from '../Categories/Categories';
import Product from '../Products/Product';
import Slider from '../Slider/Slider';

const Home = () => {

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/advertisedProducts`);
                const data = await res.json();
                return data;
            }
            catch (errors) {

            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <Slider></Slider>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <Product key={product._id} product={product} refetch={refetch} from="home"></Product>)
                }
            </div>

            <div>
                <Categories></Categories>
            </div>

        </div>
    );
};

export default Home;