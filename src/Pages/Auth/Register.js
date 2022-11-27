import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';

const Register = () => {
    const [signUpError, setSignUPError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
        // createUser(data.email, data.password)
        //     .then(result => {
        //         const user = result.user;
        //         //console.log(user);
        //         toast('User Created Successfully.')
        //         const userInfo = {
        //             displayName: data.name
        //         }
        //         updateUser(userInfo)
        //             .then(() => {
        //                 saveUser(data.name, data.email)
        //             })
        //             .catch(err => console.log(err));
        //     })
        //     .catch(error => {
        //         //console.log(error)
        //         setSignUPError(error.message)
        //     });
    }
    return (
        <div className='h-[700px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <p className='my-2'>Select a user type</p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label cursor-pointer">
                            <span className="label-text">Buyer (By default)</span>
                            <input type="radio" {...register("role")} value="buyer" className="radio checked:bg-blue-500" defaultChecked />
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label cursor-pointer">
                            <span className="label-text">Seller</span>
                            <input type="radio" {...register("role")} value="seller" className="radio checked:bg-blue-500" />
                        </label>
                    </div>

                    <input className='btn btn-primary w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p className='mt-3'>Already have an account <Link className='text-info' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Register;