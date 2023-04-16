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

export function getIndexSize(arr, val, itemSize) {
    console.log("val");
    console.log(val);
    console.log("size");
    console.log(itemSize);
    console.log("cart");
    console.log(arr);
    let indexes = [], i = 0, j;
    while (i !== -1) {
        i = arr.indexOf(val, i);
        if (i !== -1) {
            indexes.push(i);
            i++;
        }
    };
    console.log("indexes");
    console.log(indexes);

    for (j = 0; j < indexes.length; j++) {
        if (arr[indexes[j]].size === itemSize) {
            return indexes[j];
        }
    }
    return -1;
}

//check if object is empty
export const isEmptyObj = (obj) => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}