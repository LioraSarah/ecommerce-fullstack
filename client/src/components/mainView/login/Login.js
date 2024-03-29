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

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const isVerified = useSelector(selectIsVerified);

    //send request for user login in backend
    const loginUser = async (user) => {
        try {
            const response = await axios({
                method: "POST",
                data: user,
                withCredentials: true,
                url: "/login"
            });
            if (response.data.verified) { //only log in if user is verified
                dispatch(setUser(response.data)); //set logged in user details in redux state 
                dispatch(setAuthenticated(true));
                navigate('/'); //if login was successful, navigate to home page
                return response;
            }
        } catch (err) {
            console.log(err);
            alert("There's an error with your log-in, please check if email and password are correct OR if your email is verified");
        }
    };

    const addUserMutation = useMutation(loginUser);


    const { register, handleSubmit } = useForm(); //using the react-form library to handle log in info
    const onSubmit = (data) => {
        try {
            addUserMutation.mutate(data);
        } catch (err) {
            alert("There was a problem with your log-in")
            console.log("the error is - " + err);
        }
    };

    const googleLogin = () => { //open google registration
        window.open("/auth/google", "_self");
    };

    const facebookLogin = () => { //open facebook registration
        window.open("https://knitlove.herokuapp.com/auth/facebook", "_self");
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
            <button onClick={facebookLogin} id="facebook-button"><img src='./media/facebook.png' alt='facebook' class="facebook-icon" />Log in with Facebook</button>
        </article>
    );
}
