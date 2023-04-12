import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { selectCartItems } from "../../../features/cartSlice";
import { loadCart, removeItem, setCart, updateQuantity } from "../../../features/cartSlice.js";
import { selectUserId } from '../../../features/loginSlice';
import "./cart.css";
import { findInCart } from '../helper.js';

export const Cart = () => {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const cartList = useSelector(selectCartItems);
  let cart;

  //onSuccess method for useQuery, if success, set the cart in the redux state
  const onSuccess = (data) => {
    console.log("on success cart");
    dispatch(setCart(data));
    return data;
  }

  //useQuery to query the cart from the backend
  const {
    data,
    status,
    refetch
  } = useQuery(["cart"], async () => {
    if (userId) { //only query the cart if the user is logged in
      console.log("in cart query");
      console.log(userId);
      const res = await axios.get("/shopcart", { params: { userId: userId } });
      return res.data;
    }
  },
    {
      onSuccess,
    }
  );

  if (data) { //if there is a user logged in, use cart from db, otherwise, use local redux state cart
    cart = data;
  } else {
    cart = cartList;
    console.log(cartList);
  }

  const removeItemFromDB = async (itemInfo) => { //function for useMutation
    try {
      const response = await axios.delete("/shopcart", { data: itemInfo });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const removeItemMutation = useMutation(removeItemFromDB);


  const updateItemInDB = async (itemInfo) => { //also for useMutation
    try {
      const response = await axios.post("/shopcart", itemInfo);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const updateItemMutation = useMutation(updateItemInDB);

  //using useCallback because it is a dependency of useEffect
  const decreaseItem = useCallback(async (e) => { //decrease the item quantity down until 1 and not under 1
    console.log("e.target.className");
    console.log(cart);
    const productClass = e.target.className;
    const productClassArray = productClass.split(" qbtn");
    const productName = productClassArray[0];
    console.log(productName);
    const index = findInCart(cart, productName); //find item in cart to change quantity
    console.log(index);
    const newQuantity = cart[index].quantity - 1;
    if (newQuantity > 0) { //only change quantity if grater than 0
      dispatch(updateQuantity({ index: index, quantity: newQuantity })); //update quantity in redux state
      const userId = cart[index].user_id;
      const productId = cart[index].product_id;
      console.log("in decrease");
      console.log("quantity");
      console.log(newQuantity);
      if (userId) { //if a user is logged in, change quantity in db
        try {
          updateItemMutation.mutate({
            userId: userId,
            productId: productId,
            quantity: newQuantity
          });
          const data = await refetch();
          dispatch(setCart(data));
          console.log("in refetch");
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(loadCart()); //load redux cart to be up to date after quantity change
    }
  }, [cart, dispatch, updateItemMutation, refetch]);

  //using useCallback because it is a dependency of useEffect
  const increaseItem = useCallback(async (e) => { //increase the item quantity up until 3 and not above 3
    console.log("e.target.className");
    console.log(cart);
    const productClass = e.target.className;
    const productClassArray = productClass.split(" qbtn");
    const productName = productClassArray[0];
    console.log(productName);
    const index = findInCart(cart, productName); //find item in cart to change quantity
    console.log(index);
    const newQuantity = cart[index].quantity + 1;
    if (newQuantity <= 3) { //only change quantity if less than or equal to 3
      dispatch(updateQuantity({ index: index, quantity: newQuantity }));
      const userId = cart[index].user_id;
      const productId = cart[index].product_id;
      console.log("increase");
      console.log("quantity");
      console.log(newQuantity);
      if (userId) { //if a user is logged in, change quantity in db
        try {
          updateItemMutation.mutate({
            userId: userId,
            productId: productId,
            quantity: newQuantity
          });
          console.log("in refetch");
          const data = await refetch();
          dispatch(setCart(data));
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(loadCart()); //load redux cart to be up to date after quantity change
    }
  }, [cart, dispatch, updateItemMutation, refetch]);

  useEffect(() => { //refetch the cart everytime there is a change in the cart
    refetch();
    dispatch(loadCart());
    console.log("in load cart");
  }
    , [dispatch, refetch]);

  const handleRemoveClick = async (e) => {
    if (userId) { //remove from db only if neccessary - only if there is a logged in user
      try {
        removeItemMutation.mutate({ itemInfo: { userId: userId, productId: e.target.id } });
        const data = await refetch();
        dispatch(setCart(data));
      } catch (err) {
        console.log(err);
      }
    } else {
      const index = findInCart(cart, e.target.name);
      dispatch(removeItem(index)); //remove item from redux cart state
    }
    dispatch(loadCart()); //then refetch the new cart
  };

  if (status === "loading") { //if loading the cart
    return <h2 className="loading">Loading...</h2>
  };

  const calcTotal = (items) => { //calculate the total price of the cart item
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  };

  return (
    <article className="cart-container">
      <h3>your cart</h3>
      <div id="cart-cont">
        <ul id="cart-view">
          {cart.map((item, index) => (
            <li className="cart-view-item" key={index}>
              {/* <NavLink to={item.product_url} className='link-cart'> */}
              <img src={`../../../media/${item.image_url}.png`} alt={item.product_name} className="cart-item-img" />
              <div className="info">
                <h4>{item.product_name}</h4>
                <p className='info-p'>size: {item.size}<br />
                  quantity: <span onClick={decreaseItem} className={item.product_name + " qbtn"}> - </span> {item.quantity}<span onClick={increaseItem} className={item.product_name + " qbtn"}> + </span><br />
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
        <h5 id="total">total: {calcTotal(cart)}$</h5>
        <div className="main-button checkout-btn">check out</div>
      </div>
    </article>
  );
}