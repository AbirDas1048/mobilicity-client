import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import { format } from 'date-fns';

// Ram: 3 / 4 GB, Rom: 32 / 64 GB, Battery: 7040mAh, Main Camera: 8mp, Selfie Camera: 5mp 

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [addProductError, setAddProductError] = useState('');
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgdb_key;
    const date = format(new Date(), 'PP');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://mobilicity-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])

    if (!categories) {
        return <Loading></Loading>
    }

    const handleAddProduct = (data) => {
        //console.log(data);
        setAddProductError('');
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    //console.log(imgData.data.url);
                    const product = {
                        productName: data.productName,
                        price: data.price,
                        originalPrice: data.originalPrice,
                        condition: data.condition,
                        sellerContact: data.sellerContact,
                        location: data.location,
                        categoryId: data.categoryId,
                        description: data.description,
                        usesYear: data.usesYear,
                        image: imgData.data.url,
                        email: user?.email,
                        postedOn: date,
                        advertise: false,
                        availability: true
                    }

                    fetch('https://mobilicity-server.vercel.app/sellers/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                // console.log(result);
                                toast.success('Product added successfully');
                                navigate('/sellerDashboard/myProduct');
                            }
                            else {
                                toast.error("Product upload fail");
                            }
                        })

                }
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Add New Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text" {...register("productName", {
                            required: "Product name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.productName && <p className='text-red-500'>{errors.productName.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Price</span></label>
                        <input type="text" {...register("price", {
                            required: "Price is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Original Price</span></label>
                        <input type="text" {...register("originalPrice", {
                            required: "Original Price is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Condition</span></label>
                        <select {...register("condition", {
                            required: "Condition is Required"
                        })} className="select select-bordered w-full max-w-xs" defaultValue="">
                            <option disabled value="">Select Condition</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                        {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Contact No</span></label>
                        <input type="text" {...register("sellerContact", {
                            required: "Contact No is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.sellerContact && <p className='text-red-500'>{errors.sellerContact.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <select {...register("location", {
                            required: "Location is Required"
                        })} className="select select-bordered w-full max-w-xs" defaultValue="">
                            <option disabled value="">Select a location</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Rajshahi">Rajshahi</option>
                        </select>
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Category</span></label>
                        <select {...register("categoryId", {
                            required: "Category is Required"
                        })} className="select select-bordered w-full max-w-xs" defaultValue="">
                            <option disabled value="">Select a Category</option>
                            {
                                categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                            }
                        </select>
                        {errors.categoryId && <p className='text-red-500'>{errors.categoryId.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Description</span></label>
                        <textarea {...register("description", {
                            required: "Description is Required"
                        })} className="textarea textarea-bordered" placeholder="Description"></textarea>
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Year of use</span></label>
                        <input type="text" {...register("usesYear")} className="input input-bordered w-full max-w-xs" />
                        {errors.usesYear && <p className='text-red-500'>{errors.usesYear.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Image</span></label>
                        <input type="file" {...register("image", {
                            required: "Product Image is Required"
                        })} className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>

                    <input className='btn btn-primary w-full my-4' value="Add" type="submit" />
                    {addProductError && <p className='text-red-600'>{addProductError}</p>}
                </form>

            </div>
        </div>
    );
};

export default AddProduct;