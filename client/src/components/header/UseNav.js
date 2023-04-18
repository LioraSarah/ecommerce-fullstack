import './Header.css';
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { selectFirstName, logOut } from '../../features/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { clearCart, loadCart } from '../../features/cartSlice';

//navigation bar to show when user is loggen in - including a link to profile and logout option
export const UserNav = () => {
    const firstName = useSelector(selectFirstName);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        try {
            const response = await axios.delete("/logout");
            dispatch(logOut());
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    const logOutUserMutation = useMutation(logoutUser);

    const handleClick = () => {
        logOutUserMutation.mutate();
        dispatch(clearCart());
//        dispatch(loadCart());
        navigate('/login'); // navigate to the login page after the user has logged out
    }

    return (
        <>
            <ul className="top-list-general">
                <li><NavLink to="/cart"><BsCart2 className="general-icon" /></NavLink></li>
                <li><NavLink id="profile-li" to="/profile"><CgProfile className="general-icon" /> <span>Hi {firstName}!</span></NavLink></li>
                <li onClick={handleClick}><NavLink >Log out</NavLink></li>
            </ul>
        </>
    )
}