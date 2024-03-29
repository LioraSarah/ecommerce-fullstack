import './Header.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { BsCart2 } from 'react-icons/bs';

//navigation bar to show when user is not logged in (without link to user profile, with login option)
export const GuestNav = () => {

    return (
        <>
            <ul className="top-list-general">
            <li><NavLink to="/cart"><BsCart2 className="general-icon"/></NavLink></li>
                <li id="log-in"><NavLink to="/login">Log In</NavLink></li>
            </ul>
        </>
    )
}