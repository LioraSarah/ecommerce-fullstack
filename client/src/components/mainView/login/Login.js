import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import {
  setUser, setAuthenticated
} from '../../../features/loginSlice';
import "./login.css";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = async (user) => {
        try {
            const response = await axios.post("/login", user, { withCredentials: true });
            dispatch(setUser(response.data));
            dispatch(setAuthenticated(true));
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
        
    };

    const addUserMutation = useMutation(loginUser);


    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        try {
            addUserMutation.mutate(data);
            navigate('/');
        } catch (err) {
            console.log("the error is - " + err);
        }
    };

    return (
        <article id="login-view" className='content-wrapper'>
            <h2 id="login-h2">log in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <input type="email" id="email" className='input-general' name="email" placeholder='EMAIL' {...register("email", { required: true })} />
                <input type="password" id="password" className='input-general' name="password" placeholder='PASSWORD' {...register("password", { required: true })} />
                <p id="signup-p">don't have a user? <NavLink to="/register" id="signup-link">sign-up</NavLink></p>
                <input type="submit" value="LOG IN" className='main-button' id="login-button"/>
            </form>
        </article>
    );
}