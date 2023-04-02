import React, { useEffect, useState, useCallBack } from 'react';
import './ImageSlider.css';

export const ImageSlider = (props) => {
    const { slides } = props;
    const [counter, setCounter] = useState(1);

    const nextSlide = useCallBack(() => {
        let radioBtn = document.getElementById('radio' + counter);
        console.log(radioBtn);
        radioBtn.checked = true;
        setCounter(prevCounter=> prevCounter + 1);
        if (counter > 4) {
            setCounter(1);
        }
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

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
