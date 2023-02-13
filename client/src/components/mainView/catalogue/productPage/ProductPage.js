//import './Header.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addItem } from "../../../../features/cartSlice.js";
import { selectCurrentProduct, setCurrentProduct } from '../../../../features/currentProductSlice.js';
import { selectUserId } from '../../../../features/loginSlice.js';
import "./ProductPage.css";
import "../../../../index.css";

export function ProductPage() {
    const [size, setSize] = useState('');
    let { productId } = useParams();
    const { category } = useParams();
    const productURL = `/${category}/${productId}`;

    console.log(productId);

    const onSuccess = (data) => {
        dispatch(setCurrentProduct(data));
    }

    const {
        data: product,
        status,
        refetch
    } = useQuery(["product"], async () => {
        const res = await axios.get("/product", { params: { productId: productId } });
        console.log("in prod");
        console.log(res.data);
        return res.data[0];
    },
        {
            onSuccess,
        }
    );
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

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

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        dispatch(setCurrentProduct(product));
    }, [product, dispatch]);

    if (status === "loading" || status === "error") {
        return <h2>Loading...</h2>
    }

    const productImage = product.image_url;
    const productMAterial = product.material;
    const productPrice = product.price;

    const addToCart = () => {
        const cartItem = {
            ...product,
            product_size: size,
            product_url: productURL
        };
        dispatch(addItem(cartItem));
        if (userId) {
            try {
                addItemMutation.mutate({ productId: product.id, userId: userId, quantity: 1, product_size: size, product_url: productURL });
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSizeChange= (e) => {
        setSize(e.target.value);
    }

    return (
        <div id="prod">
            <div id="flex-div">
                <div className="catalog-container content-wrapper">
                    <img src={`../media/${productImage}.png`} alt={product.product_name} className="product-img" />
                    <div className="product-description">

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
                                    <input name="size" type="radio" value="s" onChange={handleSizeChange}/> s
                                    <input name="size" type="radio" value="m" onChange={handleSizeChange}/> m
                                    <input name="size" type="radio" value="l" onChange={handleSizeChange}/> l
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

                </div>
            </div>
        </div>
    )
}