import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const SocialLogin = () => {
    const { providerLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                user.role = "buyer";
                user.method = "google";
                setLoginError('');
                saveUser(user.displayName, user.email, user.role, user.method, user.uid)
            })
            .catch(error => {
                setLoginError(error.message);
            })
    }

    const saveUser = (name, email, role, method, uid) => {
        const newUser = { name, email, role, method, uid };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.acknowledged) {
                    toast.success(data.message);
                    setLoginUserEmail(email);

                }
                else {
                    toast.error(data.message);
                }

            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Continue with google</button>
            <p className='text-warning font-bold'><span className=''>NB: </span>If you are login with Google, you will be our default user(Buyer) </p>
            <div>
                {loginError && <p className='text-red-600'>{loginError}</p>}
            </div>
        </div>
    );
};

export default SocialLogin;