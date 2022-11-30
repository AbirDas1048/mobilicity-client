import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();
    const { productName, price } = booking;
    // if (navigation.state === "loading") {
    //     return <Loading></Loading>
    // }
    return (
        <div>
            <h3 className='text-3xl'>Payment for {productName}</h3>
            <p className='text-xl'>Please pay <strong>{price}</strong> for your product {productName}</p>
            <div className='w-96 my-12'>
                {/* <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements> */}
            </div>

        </div>
    );
};

export default Payment;