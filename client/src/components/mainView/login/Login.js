import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import {
    setUser, setAuthenticated, selectIsVerified
} from '../../../features/loginSlice';
import "./login.css";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
//import Cookies from 'js-cookie';

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isVerified = useSelector(selectIsVerified);

    const loginUser = async (user) => {
        try {
            const response = await axios({
                method: "POST",
                data: user,
                withCredentials: true,
                url: "/login"
            });
            if (response.data.user.verified) {
                dispatch(setUser(response.data));
                dispatch(setAuthenticated(true));
                navigate('/');
                return response;
            } else {
                console.log(response);
                alert("You haven't verified your email yet!");
            }
        } catch (err) {
            console.log(err);
            alert("There's an error with your log-in, please check if email and password are correct or if your email is verified");
            return err;
        }
    };

    const addUserMutation = useMutation(loginUser);


    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        try {
            addUserMutation.mutate(data);
        } catch (err) {
            alert("There was a problem with your log-in")
            console.log("the error is - " + err);
        }
    };

    const googleLogin = () => {
        window.open("/auth/google", "_self");
    };

    return (
        <article id="login-view" className='content-wrapper'>
            <h2 id="login-h2">log in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <input type="email" id="email" className='input-general' name="email" placeholder='EMAIL' {...register("email", { required: true })} />
                <input type="password" id="password" className='input-general' name="password" placeholder='PASSWORD' {...register("password", { required: true })} />
                <p id="signup-p">don't have a user? <NavLink to="/register" id="signup-link">sign-up</NavLink></p>
                <input type="submit" value="LOG IN" className='main-button' id="login-button" />
            </form>
            <button onClick={googleLogin} id="google-button"><img src='./media/google.png' alt='google' class="google-icon" />Log in with Google</button>
        </article>
    );
}