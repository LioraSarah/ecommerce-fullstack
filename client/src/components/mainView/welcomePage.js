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
            <ImageSlider slides={slides} />
            {/* <div id="knit-content">
                <div></div>
                <img src='./media/knit/knitting (1).png' alt='knit' className="knit-img" id="a"/>
                <img src='./media/knit/knitting (11).png' alt='knit' className="knit-img" id="b"/>
                <div></div>
                <img src='./media/knit/knitting (8).png' alt='knit' className="knit-img" id="c"/>
                <h2 id="d">knit love</h2>
                <img src='./media/knit/knitting (6).png' alt='knit' className="knit-img" id="e"/>
                <div></div>
                <img src='./media/knit/sweater (2).png' alt='knit' className="knit-img" id="f"/>
                <img src='./media/knit/sweater.png' alt='knit' className="knit-img" id="g"/>
                <div></div>
            </div> */}
        </section>
    )
}


// import React from 'react';
// import "./welcomePage.css";
// import { ImageSlider } from './ImageSlider.js';

// //component for presenting the images slider at the home page
// export const WelcomePage = () => {

//     const slides = [
//         './media/slide2.jpg',
//         './media/slide3.jpg',
//         './media/slide4.jpeg'
//     ];

//     return (
//         <section id="welcome-image">
//             {/* <ImageSlider slides={slides} /> */}
//             <div id="knit-content">
//                 <div id="a">
//                     <img src='./media/knit/knitting (1).png' alt='knit' className="knit-img" />
//                 </div>
//                 <div id="b">
//                     <img src='./media/knit/knitting (11).png' alt='knit' className="knit-img" />
//                 </div>
//                 <div>
//                     <img src='./media/knit/knitting (8).png' alt='knit' className="knit-img" />
//                 </div>
//                 <div id="d">
//                     <h2>knit love</h2>
//                 </div>
//                 <div>
//                     <img src='./media/knit/knitting (6).png' alt='knit' className="knit-img" />
//                 </div>
//                 <div id="f">
//                     <img src='./media/knit/sweater (2).png' alt='knit' className="knit-img" />
//                 </div>
//                 <div id="g">
//                     <img src='./media/knit/sweater.png' alt='knit' className="knit-img" />
//                 </div>
//             </div>
//         </section>
//     )
// }