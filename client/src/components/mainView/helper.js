import axios from 'axios';
import { addItem } from "../../features/cartSlice.js";

export const addItemToCart = (userId, product, quantity, size, productURL, dispatch, addItemMutation) => {
    const cartItem = {
        ...product,
        quantity: quantity,
        size: size,
        product_url: productURL
    };
    dispatch(addItem(cartItem));
    if (userId) {
        try {
            addItemMutation.mutate({ productId: product.id, userId: userId, quantity: quantity, size: size, product_url: productURL });
        } catch (err) {
            console.log(err);
        }
    }
};

export const addItemToDB = async (itemInfo) => {
    try {
        const response = await axios.post("/shopcart", itemInfo);
        return response;
    } catch (err) {
        console.log(err);
        alert("error adding item!");
    }

};

export const findInCart = (cart, itemName) => {
    return cart.findIndex((item) => item.product_name === itemName);
};