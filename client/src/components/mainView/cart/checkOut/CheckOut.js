// //import './Header.css';
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from "react-router-dom";
// import {
//     selectAllCatalog,
//     isLoading
// } from '../../../features/catalogSlice';

// export const CheckOut = () => {

//     let { productID } = useParams();
//     //filter = "" + filter;
//     const dispatch = useDispatch();
//     const catalogItemsPreview = useSelector(selectAllCatalog);
//     const isLoadingCatalog = useSelector(isLoading);
//     const productName = ""; //find a way to get the name out of productID
//     const productColor = "";
//     const productMAterial = "";
//     const productPrice = "";
//     const addOptions = function () {
//         for (let i=2; i<=30; i++) {
//             let select = document.getElementById("quantity");
//             let option = document.createElement("OPTION");
//             select.options.add(option);
//             option.text = i;
//             option.value = i;
//         }
//     }

//     return (
//         <article class="checkout-container">
//             <div className="checkout-description">
//                 <h3 className="checkout-h3">checkout</h3>

//                 <input name="fullname" type="text" placeholder="FULL NAME" /><br />

//                 <input name="address" type="text" placeholder="ADDRESS" /><br />

//                 <input name="phone" type="number" placeholder="PHONE" /><br />


//                 {/* <input type="submit" value="ADD" /> */}
//                 <button type="button">check out</button>

//             </div>

//         </article>
//     )

// }