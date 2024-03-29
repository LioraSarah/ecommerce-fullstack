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
  const localCart = useSelector(selectCartItems);

  const queryCart = async () => {
    if (userId) { //only query the cart if the user is logged in
      const res = await axios.get("/shopcart", { params: { userId: userId } });
      return res.data;
    };
  };

  //onSuccess method for useQuery, if success, set the cart in the redux state
  const onSuccess = (data) => {
    dispatch(setCart(data));
    return data;
  }

  //useQuery to query the cart from the backend
  const {
    data: cart,
    isLoading,
    refetch
  } = useQuery(["cart"], queryCart,
    {
      onSuccess,
    }
  );

  const removeItemFromDB = async (itemInfo) => { //function for useMutation
    try {
      const response = await axios.delete("/shopcart", { data: itemInfo });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const removeItemMutation = useMutation(removeItemFromDB, { refetchQueries: [{ query: queryCart }] });

  const updateItemInDB = async (itemInfo) => { //also for useMutation
    try {
      const response = await axios.post("/shopcart", itemInfo);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const updateItemMutation = useMutation(updateItemInDB, { refetchQueries: [{ query: queryCart }] });

  const changeQuantity = async (e) => {
    const isDecrease = e.target.innerHTML === " - ";
    const productClass = e.target.className; //a className with the neccessary product details for update
    const productClassArray = productClass.split(" qbtn ");
    const productName = productClassArray[0];
    const productSize = productClassArray[1];
    const index = getIndexSize(localCart, productName, productSize); //find item in cart to change quantity

    const newQuantity = isDecrease ? (localCart[index].quantity - 1) : (localCart[index].quantity + 1);

    if ((isDecrease && newQuantity > 0) || (!isDecrease && newQuantity <= 3)) {
      dispatch(updateQuantity({ index: index, quantity: newQuantity })); //update quantity in redux state
      let cartItemId = localCart[index].cart_id;
      if (!cartItemId) { //if the cart is not from the db (no user is logged in)
        cartItemId = localCart[index].id;
      }
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
      dispatch(loadCart());
    }
  }

  useEffect(() => { //refetch the cart everytime there is a change in the cart
    refetch();
  }, [refetch, userId]);

  useEffect(() => { //refetch the cart everytime there is a change in the cart
    dispatch(loadCart());
  }, [dispatch, localCart]);

  const handleRemoveClick = async (e) => {
    if (userId) { //remove from db only if neccessary - only if there is a logged in user
      try {
        removeItemMutation.mutate({ userId: userId, id: Number(e.target.id) });
      } catch (err) {
        console.log(err);
      }
    }
    const itemDetails = e.target.name.split("-");
    const index = getIndexSize(localCart, itemDetails[0], itemDetails[1]);
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

  const parallax = (e) => {
    document.querySelectorAll(".knit-img").forEach(function (move) {
      const moving_value = move.getAttribute("data-value");
      const x = (e.clientX * moving_value) / 250;
      const y = (e.clientY * moving_value) / 250;

      move.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  };

  return (
    <article className="cart-container" onMouseMove={parallax}>
      <div id="knit-content">
        {/* <img src='./media/knit/knitting (1).png' alt='knit' className="knit-img" data-value="-2" id="a" />
        <img src='./media/knit/knitting (11).png' alt='knit' className="knit-img" data-value="6" id="b" /> */}
        <div></div>
        <div></div>
        <img src='./media/knit/knitting (8).png' alt='knit' className="knit-img" data-value="4" id="c" />
        <div className="cart-cont" id="d">
          <h3>your cart</h3>
          <ul id="cart-view">
            {localCart?.map((item, index) => (
              <li className="cart-view-item" key={index}>
                {/* <NavLink to={item.product_url} className='link-cart'> */}
                <img src={`../../../media/${item.image_url}.png`} alt={item.product_name} className="cart-item-img" id={item.category + "-" + item.id} onClick={moveToProduct} />
                <div className="info">
                  <h4>{item.product_name}</h4>
                  <p className='info-p'>size: {item.size}<br />
                    quantity: <span onClick={changeQuantity} className={item.product_name + " qbtn " + item.size}> - </span> {item.quantity} <span onClick={changeQuantity} className={item.product_name + " qbtn " + item.size}> + </span><br />
                    price: {item.price}$
                  </p>
                </div>
                {/* </NavLink> */}

                <button className="remove-button" onClick={handleRemoveClick} name={item.product_name + "-" + item.size} id={item.cart_id ? item.cart_id : item.id}>
                  remove
                </button>
              </li>
            ))}
          </ul>
          <h5 id="total">total: {calcTotal(localCart)}$</h5>
          <div className="main-button checkout-btn">check out</div>
        </div>
        <img src='./media/knit/knitting (6).png' alt='knit' className="knit-img" data-value="-6" id="e" />
        <img src='./media/knit/sweater (2).png' alt='knit' className="knit-img" data-value="-6" id="f" />
        <img src='./media/knit/knitting (11).png' alt='knit' className="knit-img" data-value="4" id="g" />
      </div>
    </article>
  );
}
