import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.log(error))

    }

    const error = useRouteError();
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className='text-3xl'>Please, <button onClick={handleLogout}>LogOut</button> and Log back in</h4>
        </div>
    );
};

export default DisplayError;