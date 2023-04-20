const express = require('express');
const cartRouter = express.Router();
const cart = require("./db-cart");


cartRouter.post("/", async (req, res) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    const userId = req.body.userId;
    const productId = req.body.productId;
    const productSize = req.body.size;
    try {
        let response;
        if (id) { //if there is a cart_id: the item is already in the cart and just need update
            response = cart.updateQuantity(id, quantity);
        } else { //otherwise, it is not in the cart and need to be added as new item (row)
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
    const userCart = await cart.getCart(userId);
    res.status(200).send(userCart);
});

cartRouter.delete("/", async (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    const response = cart.deleteItem(id);
    res.status(204).send();
});

module.exports = cartRouter;
