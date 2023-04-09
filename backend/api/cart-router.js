const express = require('express');
const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    const { quantity } = req.body;
    const productSize = req.body.size;
    console.log("body");
    console.log(req.body);
    console.log(userId);
    console.log(productId);
    console.log(quantity);
    console.log("in api post cart");
    try {
        console.log("find item");
        const findItem = await cart.getItemInCart(userId, productId);
        console.log(findItem);
        let response;
        if (findItem.length === 0) {
            console.log("did not find");
            response = await cart.addToCart({ userId, productId, quantity, productSize });
        } else {
            console.log("did find");
            response = cart.updateQuantity(userId, productId, quantity);
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
    const { itemInfo } = req.body;
    const response = cart.deleteItem(itemInfo);
    res.status(204).send();
});

module.exports = cartRouter;
