//import './Header.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addItem, selectCartItems, updateQuantity } from "../../../../features/cartSlice.js";
import { setCurrentProduct } from '../../../../features/currentProductSlice.js';
import { selectUserId } from '../../../../features/loginSlice.js';
import "./ProductPage.css";
import "../../../../index.css";
import { getIndexSize } from '../../helper.js';
import { VscSearch } from 'react-icons/vsc';

export function ProductPage() {
    const [size, setSize] = useState(''); //local state for controlling size selection
    const [quantity, setItemQuantity] = useState(1); //local state for controlling quantity selection
    const [isClicked, setClicked] = useState(false);
    let { productId } = useParams();
    const { category } = useParams();
    const productURL = `/${category}/${productId}`;
    let cart = useSelector(selectCartItems);
    const navigate = useNavigate();

    const onSuccess = (data) => { //onSuccess for useQuery
        dispatch(setCurrentProduct({ product: data, quantity: 1 }));
    }

    const {
        data: product,
        status,
        refetch
    } = useQuery(["product"], async () => {
        const res = await axios.get("/product", { params: { productId: productId } });
        return res.data[0];
    },
        {
            onSuccess,
        }
    );
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    const addItemToDB = async (itemInfo) => { //for useMutation
        try {
            const response = await axios.post("/shopcart", itemInfo);
            return response;
        } catch (err) {
            console.log(err);
            alert("error adding item!");
        }

    };

    const addItemMutation = useMutation(addItemToDB);

    const updateItemInDB = async (itemInfo) => { //for second useMutation
        try {
            const response = await axios.post("/shopcart", itemInfo);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    const updateItemMutation = useMutation(updateItemInDB);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        dispatch(setCurrentProduct({ product: product, quantity: quantity }));
    }, [product, dispatch, quantity]);

    if (status === "loading" || status === "error") { //if loading the product
        return <h2 className="loading">Loading...</h2>
    }

    const productImage = product.image_url;
    const productMAterial = product.material;
    const productPrice = product.price;

    const addToCart = (e) => {
        e.preventDefault();
        const index = getIndexSize(cart, product.product_name, size);
        if (index >= 0) { //if item is already in cart with same size, only update it's quantity in cart (up to 3)
            let newQuantity
            if (cart[index].quantity <= 3) { //only add quantity if less or equal to 3
                newQuantity = cart[index].quantity + quantity;
            } else {
                newQuantity = quantity;
            }
            if (newQuantity <= 3) {
                dispatch(updateQuantity({ index: index, quantity: newQuantity }));
                const itemInfo = cart[index];
                if (userId) { //only update in db if a user is logged in
                    try {
                        updateItemMutation.mutate({ userId: userId, id: itemInfo.cart_id, quantity: newQuantity, size: itemInfo.size, productId: productId });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        } else { //if item is not already in cart or have different size, add it to the cart as new item
            const cartItem = {
                ...product,
                quantity: quantity,
                size: size,
                product_url: productURL
            };
            dispatch(addItem(cartItem));
            if (userId) { // if a user is logged in, add the new item to db too
                try {
                    addItemMutation.mutate({ productId: product.id, userId: userId, quantity: quantity, size: size, product_url: productURL });
                } catch (err) {
                    console.log(err);
                }
            }
        }
        navigate('/cart'); //navigate to cart page after adding to cart
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setItemQuantity(Number(e.target.value));
    };

    return (
        <div id="prod">
            <div id="flex-div">
                <div className="catalog-container">
                    <div id="img-container">
                        <img src={`../media/${productImage}.png`} alt={product.product_name} className="product-img" onClick={() => setClicked(true)} />
                        <VscSearch id="magnify" />
                    </div>
                    <form className="product-description" onSubmit={addToCart}>

                        <h3 className="product-h3 info-section">{product.product_name}</h3>
                        <div className="description">
                            <div id="material" className="info-section">
                                <p>
                                    yarn: {productMAterial}
                                </p>
                            </div>

                            <div id="size" className="info-section">
                                <label>size:</label><br />
                                <div className="bold-option">
                                    <input name="size" type="radio" value="s" onChange={handleSizeChange} required /> s
                                    <input name="size" type="radio" value="m" onChange={handleSizeChange} /> m
                                    <input name="size" type="radio" value="l" onChange={handleSizeChange} /> l
                                </div>
                            </div>

                            <div id="quantity" className="info-section">
                                <label>quantity:</label><br />
                                <select name="quantity" id="quantity-select" value={quantity} onChange={handleQuantityChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    {/* { addOptions() } */}
                                </select><br />
                            </div>

                            <p id="price-p">
                                price: <span id="price">{productPrice}</span>$
                            </p>
                        </div>

                        {/* <input type="submit" value="ADD" /> */}
                        <input type="submit" value="ADD TO CART" className="main-button add" />

                    </form>

                    <imagePopup>
                        <div className="popup-media" style={{ display: isClicked ? 'flex' : 'none' }} onClick={() => setClicked(false)} >
                            <img src={`../media/${productImage}.png`} alt={product.product_name} />
                        </div>
                    </imagePopup>
                </div>
            </div>
        </div>
    )
}
