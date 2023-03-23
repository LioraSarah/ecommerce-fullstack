import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { selectCartItems } from "../../../features/cartSlice";
import { loadCart, removeItem, setCart, updateQuantity } from "../../../features/cartSlice.js";
import { selectUserId, selectUserType } from '../../../features/loginSlice';
import "./cart.css";
import {findInCart} from '../helper.js';

export const Cart = () => {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const onSuccess = (data) => {
    dispatch(setCart(data));
  }

  const {
    data: cart,
    status,
    refetch
  } = useQuery(["cart"], async () => {
    if (userId) {
      console.log("in cart");
      console.log(userId);
      const res = await axios.get("/shopcart", { params: { userId: userId } });
      return res.data;
    }
  },
    {
      onSuccess,
    }
  );
  console.log("cart");

  const cartItemsPreview = useSelector(selectCartItems);

  useEffect(() => {
    refetch();
    dispatch(loadCart());
  }
    , [dispatch, cartItemsPreview, refetch]);

  const removeItemFromDB = async (itemInfo) => {
    try {
      const response = await axios.delete("/shopcart", { data: itemInfo });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const removeItemMutation = useMutation(removeItemFromDB);

  
  const updateItemInDB = async (itemInfo) => {
    try {
      const response = await axios.post("/shopcart", { data: itemInfo });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const updateItemMutation = useMutation(updateItemInDB);

  const handleRemoveClick = (e) => {
    if (userId) {
      try {
        removeItemMutation.mutate({ itemInfo: { userId: userId, productId: e.target.id } });
      } catch (err) {
        console.log(err);
      }
    }
    const index = findInCart(cartItemsPreview ,e.target.name);
    dispatch(removeItem(index));
    dispatch(loadCart());
  };

  if (status === "loading") {
    return <h2 className="loading">Loading...</h2>
  };

  const calcTotal = (items) => {
    let total = 0;
    for (let i=0; i<items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  };

  const decreaseItem = (e) => {
    console.log("e.target.className");
    console.log(e.target.className);
    const index = findInCart(cartItemsPreview, e.target.className);
    console.log(index);
    const newQuantity = cartItemsPreview[index].quantity - 1;
    if (newQuantity) {
      dispatch(updateQuantity({index: index, quantity: newQuantity}));
      const userId = cartItemsPreview[index].user_id;
      const productId = cartItemsPreview[index].product_id;
      console.log("indecrease");
      console.log("quantity");
      console.log(newQuantity);
      if (userId) {
        try {
        updateItemMutation.mutate({
          userId: userId,
          productId: productId,
          quantity: newQuantity
        });
      } catch (err) {
        console.log(err);
      }
      }
    } 
  };

  const increaseItem = (e) => {
    console.log("e.target.className");
    console.log(cartItemsPreview);
    console.log(e.target.className);
    const index = findInCart(cartItemsPreview, e.target.className);
    console.log(index);
    const newQuantity = cartItemsPreview[index].quantity + 1;
    if (newQuantity <= 3) {
      dispatch(updateQuantity({index: index, quantity: newQuantity}));
      const userId = cartItemsPreview[index].user_id;
      const productId = cartItemsPreview[index].product_id;
      if (userId) {
        try {
        updateItemMutation.mutate({
          userId: userId,
          productId: productId,
          quantity: newQuantity
        });
      } catch (err) {
        console.log(err);
      }
      }
    }
    //also change in database!!!
  }

  return (
    <article className="cart-container">
      <h3>your cart</h3>
      <div id="cart-cont">
        <ul id="cart-view">
          {cartItemsPreview.map((item, index) => (
            <li className="cart-view-item" key={index}>
              {/* <NavLink to={item.product_url} className='link-cart'> */}
                <img src={`../../../media/${item.image_url}.png`} alt={item.product_name} className="cart-item-img" />
                <div className="info">
                    <h4>{item.product_name}</h4>
                  <p className='info-p'>size: {item.size}<br />
                    quantity: <span onClick={decreaseItem} className={item.product_name}> - </span> {item.quantity}<span onClick={increaseItem} className={item.product_name}> + </span><br />
                    price: {item.price}$
                  </p>
                </div>
                {/* </NavLink> */}

                <button className="remove-button" onClick={handleRemoveClick} name={item.product_name} id={item.id}>
                  remove
                </button>
            </li>
          ))}
        </ul>
        <h5 id="total">total: {calcTotal(cartItemsPreview)}$</h5>
        <div className="main-button checkout-btn">check out</div>
      </div>
    </article>
  );
}