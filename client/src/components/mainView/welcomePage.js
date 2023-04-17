import React from 'react';
import "./welcomePage.css";
import { ImageSlider } from './ImageSlider.js';

//component for presenting the images slider at the home page
export const WelcomePage = () => {

    const slides = [
        './media/slide2.jpg',
        './media/slide3.jpg',
        './media/slide4.jpeg'
    ];

    return (
        <section id="welcome-image">
            {/* <ImageSlider slides={slides} /> */}
            <div id="content">
        <h2>hi</h2>
            </div>
        </section>
    )
}