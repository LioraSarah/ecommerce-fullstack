//import './Header.css';
import React from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { addItem } from "../../../../features/cartSlice.js";
import "./ProductPage.css";
import { selectCurrentProduct } from '../../../../features/currentProductSlice.js';
import { selectUserId } from '../../../../features/loginSlice.js';

export function ProductPage() {

    let { productName } = useParams();
    const { category } = useParams();
    const productURL = `/${category}/${productName}`;
    const dispatch = useDispatch();
    const product = useSelector(selectCurrentProduct);
    const userId = useSelector(selectUserId);

    const productImage = product.image_url;
    const productMAterial = product.material;
    const productPrice = product.price;

    const addItemToDB = async (itemInfo) => {
        try {
            const response = await axios.post("/shopcart", itemInfo);
            return response;
        } catch (err) {
            console.log(err);
            alert("error adding item!");
        }

    };

    const addItemMutation = useMutation(addItemToDB);

    const addToCart = () => {
        const cartItem = {
            ...product,
            product_url: productURL
        };
        dispatch(addItem(cartItem));
        if (userId) {
            try {
                addItemMutation.mutate({ productId: product.id, userId: userId, quantity: 1, product_url: productURL });
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div id="prod">
            <div id="flex-div">
                <article className="catalog-container content-wrapper">
                    <img src={`../media/${productImage}.png`} alt={productName} className="product-img" />
                    <div className="product-description">

                        <h3 className="product-h3 info-section">{productName}</h3>
                        <div className="description">
                            <div id="material" className="info-section">
                                <p>
                                    yarn: {productMAterial}
                                </p>
                            </div>

                            <div id="size" className="info-section">
                                <label>size:</label><br />
                                <div className="bold-option">
                                    <input name="size" type="radio" value="s" /> s
                                    <input name="size" type="radio" value="m" /> m
                                    <input name="size" type="radio" value="l" /> l
                                </div>
                            </div>

                            <div id="quantity" className="info-section">
                                <label>quantity:</label><br />
                                <select name="quantity" id="quantity-select">
                                    <option value="1">1</option>
                                    {/* { addOptions() } */}
                                </select><br />
                            </div>

                            <p id="price-p">
                                price: <span id="price">{productPrice}</span>$
                            </p>
                        </div>

                        {/* <input type="submit" value="ADD" /> */}
                        <NavLink onClick={addToCart} to="/cart">
                            <button type="button" className="main-button add">add to cart</button>
                        </NavLink>

                    </div>

                </article>
            </div>
        </div>
    )
}