const express = require('express');
const cartRouter = express.Router();
const cart = require("./db-cart");


cartRouter.post("/", async (req, res) => {
    const { id } = req.body;
    const { quantity } = req.body;
    const { userId } = req.body;
    const { productId } = req.body;
    const productSize = req.body.size;
    console.log("body");
    console.log(req.body);
    console.log(id)
    console.log(quantity);
    console.log("in api post cart");
    try {
        let response;
        if (id) { //if there is a cart_id: the item is already in the cart and just need update
            console.log("did find");
            response = cart.updateQuantity(id, quantity);
        } else { //otherwise, it is not in the cart and need to be added as new item (row)
            console.log("did not find");
            response = await cart.addToCart({ userId, productId, quantity, productSize });
        }
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

cartRouter.get("/", async (req, res) => {
    const { userId } = req.query;
    console.log("in get cart");
    console.log(userId);
    const userCart = await cart.getCart(userId);
    console.log(userCart);
    res.status(200).send(userCart);
});

cartRouter.delete("/", async (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    const response = cart.deleteItem(id);
    res.status(204).send();
});

module.exports = cartRouter;
