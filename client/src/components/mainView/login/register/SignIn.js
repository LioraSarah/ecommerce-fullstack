import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import "../login.css";
import "./signIn.css";

export function SignIn() {
    const navigate = useNavigate();

    const addUser = async (user) => { //add registered new user details to db with useMutation
        try {
            const response = await axios({
                method: "POST",
                data: user,
                withCredentials: true,
                url: "/register"
            });
            alert("The registration was successful!"); //message to indicate the user for success
            navigate('/verify'); //after success, navigate to the email verification message page
            return response;
        } catch (err) {
            const constraint = err.response.data.constraint;
            if (constraint === "email") {
                alert("The email you have provided is already registered!");
            }
        }
        
    };

    const addUserMutation = useMutation(addUser);

    const { register, handleSubmit } = useForm(); //using the react-form library to handle sign in form

    const onSubmit = (data) => {
        try {
            const response = addUserMutation.mutate({newUser: data});
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <article id="signIn-view" className='content-wrapper'>
            <h2 id="signIn-h2">sign in</h2>
            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" id="firstName-reg" className='input-general reg-input' name="firstName" placeholder='FIRST NAME' {...register("firstName", { required: true })} />
            <input type="text" id="lastName-reg" className='input-general reg-input' name="lastName" placeholder='LAST NAME' {...register("lastName", { required: true })} />

                <input type="email" id="email-reg" className='input-general reg-input' name="email" placeholder='EMAIL' {...register("email", { required: true })} />
                <input type="password" id="password-reg" className='input-general' name="password" placeholder='PASSWORD' {...register("password", { required: true })} />
                <input type="submit" value="SIGN IN" className='main-button' id="signIn-button"/>
            </form>
        </article>
    );
}