const express = require('express');
const catalogueRouter = express.Router();
const catalogue = require("./backend/api/db-catalogue");

catalogueRouter.get("/", async (req, res) => {
    const { category } = req.query;
    try {
        const response = await catalogue.getCategory(category);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = catalogueRouter;