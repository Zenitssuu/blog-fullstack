import React from 'react'
import {useDispatch} from "react-redux"
import { logout } from '../../features/userSlice.js';
import authServices from '../../appwrite/userAuth.js';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        authServices.logout()
        .then(()=>{
            dispatch(logout())
        })
        navigate('/login');
    }
    return (
        <button 
        onClick={logoutHandler}
        className="inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg">
            Logout
        </button>
    )
}

export default LogoutBtn
