import React, { useEffect } from 'react';
import './ImageSlider.css';

export const ImageSlider = (props) => {
    const { slides } = props;

    const nextSlide = (counter) => {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 4) {
            counter = 1;
        }
    };

    useEffect(() => {
        let counter = 1;
        const slideInterval = setInterval(nextSlide(counter), 5000);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className='slider-wrapper'>
            <div className="slider">
                <div className="slides">

                    <input type="radio" name="radio-btn" id="radio1" className='radiobtn' />
                    <input type="radio" name="radio-btn" id="radio2" className='radiobtn' />
                    <input type="radio" name="radio-btn" id="radio3" className='radiobtn' />
                    <input type="radio" name="radio-btn" id="radio4" className='radiobtn' />

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
