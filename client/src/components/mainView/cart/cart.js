import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { selectCartItems } from "../../../features/cartSlice";
import { loadCart, removeItem, setCart, updateQuantity } from "../../../features/cartSlice.js";
import { selectUserId } from '../../../features/loginSlice';
import "./cart.css";
import { getIndexSize } from '../helper.js';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCartItems);

  const queryCart = async () => {
    if (userId) { //only query the cart if the user is logged in
      console.log("in cart query");
      console.log(userId);
      const res = await axios.get("/shopcart", { params: { userId: userId } });
      console.log(res);
      return res.data;
    };
  };

  //onSuccess method for useQuery, if success, set the cart in the redux state
  const onSuccess = (data) => {
    console.log("on success cart");
    console.log(data);
    dispatch(setCart(data));
    return data;
  }

  //useQuery to query the cart from the backend
  const {
    data,
    isLoading,
    refetch
  } = useQuery(["cart"], queryCart,
    {
      force: true,
      onSuccess,
    }
  );

  const removeItemFromDB = async (itemInfo) => { //function for useMutation
    try {
      const response = await axios.delete("/shopcart", { itemInfo });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const removeItemMutation = useMutation(removeItemFromDB, {refetchQueries: [ {query: queryCart } ]});


  const updateItemInDB = async (itemInfo) => { //also for useMutation
    try {
      const response = await axios.post("/shopcart", itemInfo);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const updateItemMutation = useMutation(updateItemInDB, {refetchQueries: [ {query: queryCart } ]});

  //using useCallback because it is a dependency of useEffect
  const decreaseItem = async (e) => { //decrease the item quantity down until 1 and not under 1
    console.log("e.target.className");
    console.log(cart);
    const productClass = e.target.className;
    const productClassArray = productClass.split(" qbtn");
    const productName = productClassArray[0];
    const productSize = productClassArray[1];
    console.log(productName);
    console.log(productSize);
    const index = getIndexSize(cart, productName, productSize); //find item in cart to change quantity
    console.log(index);
    const newQuantity = cart[index].quantity - 1;
    if (newQuantity > 0) { //only change quantity if grater than 0
      dispatch(updateQuantity({ index: index, quantity: newQuantity })); //update quantity in redux state
      const cartItemId = cart[index].id;
      console.log("in decrease");
      if (userId) { //if a user is logged in, change quantity in db
        try {
          updateItemMutation.mutate({
            userId: userId,
            id: cartItemId,
            quantity: newQuantity
          });
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(loadCart()); //load redux cart to be up to date after quantity change
    }
  };

  //using useCallback because it is a dependency of useEffect
  const increaseItem = async (e) => { //increase the item quantity up until 3 and not above 3
    console.log("e.target.className");
    console.log(cart);
    const productClass = e.target.className;
    const productClassArray = productClass.split(" qbtn");
    const productName = productClassArray[0];
    const productSize = productClassArray[1];
    console.log(productName);
    console.log(productSize);
    const index = getIndexSize(cart, productName, productSize); //find item in cart to change quantity
    console.log(index);
    const newQuantity = cart[index].quantity + 1;
    if (newQuantity <= 3) { //only change quantity if less than or equal to 3
      dispatch(updateQuantity({ index: index, quantity: newQuantity }));
      const cartItemId = cart[index].id;
      console.log("increase");
      console.log("quantity");
      console.log(newQuantity);
      if (userId) { //if a user is logged in, change quantity in db
        try {
          updateItemMutation.mutate({
            userId: userId,
            id: cartItemId,
            quantity: newQuantity
          });
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(loadCart()); //load redux cart to be up to date after quantity change
    }
  };

  useEffect(() => { //refetch the cart everytime there is a change in the cart
    refetch();
    dispatch(loadCart());
    console.log("in load cart");
  }
    , [dispatch, refetch]);

  const handleRemoveClick = async (e) => {
    if (userId) { //remove from db only if neccessary - only if there is a logged in user
      try {
        removeItemMutation.mutate({ userId: userId, id: e.target.id });
      } catch (err) {
        console.log(err);
      }
    }
      const itemDetails = e.target.name.split("-");
      const index = getIndexSize(cart, itemDetails[0], itemDetails[1]);
      dispatch(removeItem(index)); //remove item from redux cart state
    dispatch(loadCart()); //then refetch the new cart
  };

  if (isLoading) { //if loading the cart
    return <h2 className="loading">Loading...</h2>
  };

  const calcTotal = (items) => { //calculate the total price of the cart item
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  };

  const moveToProduct = (e) => {
    const itemPathArray = e.target.id.split("-");
    const itemPath = `/${itemPathArray[0]}/${itemPathArray[1]}`
    navigate(itemPath);
  }

  console.log(cart);

  return (
    <article className="cart-container">
      <h3>your cart</h3>
      <div id="cart-cont">
        <ul id="cart-view">
          {cart?.map((item, index) => (
            <li className="cart-view-item" key={index}>
              {/* <NavLink to={item.product_url} className='link-cart'> */}
              <img src={`../../../media/${item.image_url}.png`} alt={item.product_name} className="cart-item-img" id={item.category + "-" + item.product_id} onClick={moveToProduct}/>
              <div className="info">
                <h4>{item.product_name}</h4>
                <p className='info-p'>size: {item.size}<br />
                  quantity: <span onClick={decreaseItem} className={item.product_name + " qbtn" + item.size}> - </span> {item.quantity}<span onClick={increaseItem} className={item.product_name + " qbtn" + item.size}> + </span><br />
                  price: {item.price}$
                </p>
              </div>
              {/* </NavLink> */}

              <button className="remove-button" onClick={handleRemoveClick} name={item.product_name + "-" + item.size} id={item.id}>
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