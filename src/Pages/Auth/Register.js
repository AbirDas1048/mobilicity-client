import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../Hooks/useToken';

const Register = () => {

    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = async (data) => {
        data.method = "manual";
        setSignUPError('');
        await createUser(data.email, data.password)
            .then(result => {

                const user = result.user;
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {

                        saveUser(data.name, data.email, data.role, data.method, user.uid)
                    })
                    .catch(err => {
                        console.log(err);

                    });
            })
            .catch(error => {
                //console.log(error)
                setSignUPError(error.message);

            });
    }

    const saveUser = async (name, email, role, method, uid) => {
        const newUser = { name, email, role, method, uid };
        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(data.message);
                    setCreatedUserEmail(email);

                }
                else {

                    toast.error(data.message);
                }

            })
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