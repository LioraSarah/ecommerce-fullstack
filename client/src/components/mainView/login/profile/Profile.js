import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { selectFirstName, selectEmail, selectLastName } from '../../../../features/loginSlice';
import "./profile.css";

export const Profile = () => {

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);

    return (
        <article className="profile">
            <div id="info-container">
            <h3>Hi, <span>{firstName}</span></h3>
            <h5>This is your info:</h5>
            <ul id="profile-info">
                <li><span className="info-title">First name:</span> {firstName}</li>
                <li><span className="info-title">Last name:</span> {lastName}</li>
                <li><span className="info-title">Email:</span> {email}</li>
            </ul>
            </div>

            <NavLink to="/cart" id="profile-cart">To my cart</NavLink>
        </article>
    );
}