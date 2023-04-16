import axios from 'axios';
import { addItem } from "../../features/cartSlice.js";

export const addItemToCart = (userId, product, quantity, size, productURL, dispatch, addItemMutation) => {
    const cartItem = {
        ...product,
        quantity: quantity,
        size: size,
        product_url: productURL
    };
    dispatch(addItem(cartItem)); //save cart in redux state
    if (userId) { //only if there is a logged in user, save cart in db
        try {
            addItemMutation.mutate({ productId: product.id, userId: userId, quantity: quantity, size: size, product_url: productURL });
        } catch (err) {
            console.log(err);
        }
    }
};

export const addItemToDB = async (itemInfo) => { //for sending the request to backend
    try {
        const response = await axios.post("/shopcart", itemInfo);
        return response;
    } catch (err) {
        console.log(err);
        alert("error adding item!");
    }

};

//find an item in given cart using item name
export const findInCart = (cart, id) => {
    return cart.findIndex((item) => item.id === id);
};

export function getIndexSize(cart, productName, itemSize) {
    return cart.findIndex((item) => {
        return item.product_name === productName && item.size === itemSize;
    });
}

//check if object is empty
export const isEmptyObj = (obj) => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}