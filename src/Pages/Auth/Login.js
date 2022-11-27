import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import SocialLogin from './SocialLogin';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import toast from 'react-hot-toast';


const Login = () => {

    const { signIn } = useContext(AuthContext);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        //console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                //console.log(user);
                toast.success("Successfully Login");
                setLoginUserEmail(user.email);

            })
            .catch(error => {
                setLoginError(error.message);
            });
    }


    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>This is Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" {...register("email", { required: "Email is required" })} />
                        {errors.email && <p role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs" {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: "error message" }
                            })} />
                        {errors.password && <p role="alert">{errors.password?.message}</p>}

                    </div>
                    <br />

                    <input className='btn btn-primary w-full' value="login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='mt-3'>New to Mobilicity <Link to='/register' className='text-info'>Create New Account</Link></p>
                <div className="divider">OR</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;