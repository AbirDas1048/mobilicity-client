import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const { productName, price } = booking;
    return (
        <div>
            <h3 className='text-3xl'>Payment for {productName}</h3>
            <p className='text-xl'>Please pay <strong>{price}</strong> for your product {productName}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;