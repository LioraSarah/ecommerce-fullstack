import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { selectCartItems } from "../../../features/cartSlice";
import { loadCart, removeItem, setCart } from "../../../features/cartSlice.js";
import { selectUserId, loaduser, selectUserType } from '../../../features/loginSlice';
import "./cart.css";

export const Cart = () => {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userType = useSelector(selectUserType);

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

  const handleRemoveClick = (e) => {
    if (userId) {
      try {
        removeItemMutation.mutate({ itemInfo: { userId: userId, productId: e.target.id } });
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(removeItem(e.target.name));
    dispatch(loadCart());
  }

  if (status === "loading") {
    return <h2>Loading...</h2>
  }

  const calcTotal = (items) => {
    let total = 0;
    for (let i=0; i<items.length; i++) {
      total += items[i].price;
    }
    return total;
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
                    quantity: {'1'}<br />
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