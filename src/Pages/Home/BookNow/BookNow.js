import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookNow = ({ productData, setProductData }) => {
    //console.log(productData);
    const { user } = useContext(AuthContext);

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const buyerPhone = form.buyerPhone.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            buyerName: user.displayName,
            buyerEmail: user.email,
            buyerPhone,
            meetingLocation,
            productId: productData._id,
            productName: productData.productName,
            price: productData.price
        }

        fetch('http://localhost:5000/buyer/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProductData(null);
                    toast.success('Booking Confirmed');
                } else {
                    toast.error(data.message);
                }

            })

    }
    return (
        <>
            {/* <label htmlFor="booking-modal" className="btn btn-sm btn-accent">Book Now</label> */}
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Fill up and check this form for booking</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='buyerName' type="text" value={user.displayName} readOnly disabled className="input w-full input-bordered" />
                        <input name='buyerEmail' value={user.email} type="email" readOnly disabled className="input w-full input-bordered" />
                        <input name='productName' type="text" value={productData.productName} readOnly disabled className="input w-full input-bordered" />
                        <input name='productPrice' value={productData.price} type="email" readOnly disabled className="input w-full input-bordered" />
                        <input name='buyerPhone' type="text" placeholder="Phone No" className="input w-full input-bordered" required />
                        <input name='meetingLocation' type="text" placeholder="Meeting Location" className="input w-full input-bordered" required />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookNow;