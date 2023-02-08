//import './Header.css';
import React from 'react';
import "./welcomePage.css";
import { ImageSlider } from './ImageSlider.js';

export const WelcomePage = () => {

    const slides = [
        './media/home.jpg',
        './media/slide2.jpg',
        './media/slide3.jpg',
        './media/slide4.jpeg'
    ];

    return (
        <section id="welcome-image">
            <ImageSlider slides={slides} />
        </section>
    )
}