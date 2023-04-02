import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsVerified, selectIsVerified
} from '../../../../features/loginSlice';
import { useParams } from 'react-router-dom';
import "./verify.css";

export function Verify() {

    const {id, token} = useParams(); //optional params

    const dispatch = useDispatch();
    
    const isVerified = useSelector(selectIsVerified);

    const onSuccess = (data) => {//for useQuery
        if (data) {
            console.log("in on success: " + data);
            dispatch(setIsVerified(data));
        }
    }

    //send user id and token to the backend in order to verify (comparing user tokens)
    const {
        data,
    } = useQuery(["verified"], async () => {
        //if the user has provided a token and isn't already verified, send request
        if (token && !isVerified) {
            const res = await axios({
                method: "GET",
                withCredentials: true,
                url: `/verify/user/${id}/${token}`
            });
            console.log(res.data);
            return res.data;
        }
    },
        {
            onSuccess,
        }
    );
    
    if (!token) { //if the users still hasn't clicked the verification link and didn't recieve his token
        return (
            <article className='content-wrapper verify'>
                    <h3>A verification link has been sent to your Email!</h3>
                    <p>Please enter you email and check the link in order to proceed with the sign-up</p>
                </article>
        )
    }

    if (!isVerified) { //if the verification failed

        <article className='content-wrapper verify'>
            <h3>It seems there is a problem verifying your email</h3>
            <p>Please try again.</p>
        </article>
    } 

    return ( //in case all of the above were false - the user now has a correct token and is verified
        <article className='content-wrapper verify'>
            <h3>Your email is now verified!</h3>
            <p>You can now proceed to log-in with you email and password!</p>
        </article>
    );

}