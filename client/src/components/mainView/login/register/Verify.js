import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsVerified, selectIsVerified
} from '../../../../features/loginSlice';
import { useParams } from 'react-router-dom';

export function Verify() {

    const {id, token} = useParams();

    const dispatch = useDispatch();
    
    const isVerified = useSelector(selectIsVerified);

    const onSuccess = (data) => {
        if (data) {
            console.log("in on success: " + data);
            dispatch(setIsVerified(data));
        }
    }

    const {
        data,
    } = useQuery(["verified"], async () => {
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
    
    if (!token) {
        return (
            <article className='content-wrapper'>
                    <h3>A verification link has been sent to your Email!</h3>
                    <p>Please enter you email and check the link in order to proceed with the sign-up</p>
                </article>
        )
    }

    if (!isVerified) {

        <article className='content-wrapper'>
            <h3>It seems there is a problem verifying your email</h3>
            <p>Please try again.</p>
        </article>
    } 

    return (
        <article className='content-wrapper'>
            <h3>Your email is now verified!</h3>
            <p>You can now proceed to log-in with you email and password!</p>
        </article>
    );

}