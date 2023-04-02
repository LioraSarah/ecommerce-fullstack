import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

export const ImageSlider = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { slides } = props;

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    });

    const prevSlide = () => {
        const newIndex = (currentIndex === 0) ? (slides.length - 1) : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = currentIndex === (slides.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        // <div id="slider-container">
        //     {/* <div id="leftArrow" className="general-arrow" onClick={prevSlide}>{'<'}</div> */}
        //     <div id="banner">
        //         <div id="banner-text">
        //             <h2>Knit-love</h2>
        //             <p>Anything hand-knitted</p>
        //         </div>
        //     </div>
        //     <div
        //         className="flex-hidden"
        //         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        //     >
        //         {slides.map((url, i) => (<img src={url} alt="slide" className="img-slide" key={i} />))}
        //     </div>
        //     {/* <div id="slider" style={{backgroundImage: `url(${slides[currentIndex]})`}}></div> */}
        //     {/* <div id="rightArrow" className="general-arrow" onClick={nextSlide}>{'>'}</div> */}
        // </div>
        <div className='slider-wrapper'>
            <div className="slider">
                <div className="slides">
                    <div className='slide first'>
                        <img src='./media/home.jpg' alt='slide' />
                    </div>
                    {slides.map((url, i) => (
                        <div className='slide'>
                            <img src={url} alt="slide" className="img-slide" key={i} />
                        </div>)
                    )}
                </div>
            </div>
        </div>

    );

};
