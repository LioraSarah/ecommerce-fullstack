import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
    setIsVerified
} from '../../../../features/loginSlice';

export function Verify() {

    const dispatch = useDispatch();

    const onSuccess = (data) => {
        dispatch(setIsVerified(data));
    }

    const {
        data: isVerified,
        status,
    } = useQuery(["isVerified"], async () => {
        const res = await axios({
            method: "GET",
            withCredentials: true,
            url: "/user"
        });
        return res.data.user.verified;
    },
        {
            onSuccess,
        }
    );

    if (isVerified) {
        return (
            <article className='content-wrapper'>
                <h3>Your email is now verified!</h3>
                <p>You can now proceed to log-in with you email and password!</p>
            </article>
        );
    } else {
        <article className='content-wrapper'>
            <h3>It seems there is a problem verifying your email</h3>
            <p>Please try again.</p>
        </article>
    }

}