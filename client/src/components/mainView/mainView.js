import React from 'react';
import { WelcomePage } from "./welcomePage.js";
import { CatalogueView } from "./catalogue/CatalogView.js";
import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./catalogue/productPage/ProductPage.js";
import { Cart } from "./cart/cart.js";
import { Login } from "./login/Login.js";
import { SignIn } from "./login/register/SignIn.js";
import { Profile } from './login/profile/Profile.js';
import { Verify } from "./login/register/Verify.js";
import "./mainView.css";

export const MainView = () => {

    return (
        <section id="main-section">
            <Routes>
                <Route path="/*" element={<WelcomePage />} />
                <Route path="/:category/*"
                    element={<CatalogueView />} />
                <Route path={"/:category/:productId"}
                    element={<ProductPage />} />
                <Route path={"/cart"}
                    element={<Cart />} />
                <Route path={"/login"}
                    element={<Login />} />
                <Route path={"/register"}
                    element={<SignIn />} />
                <Route path={"/profile"}
                    element={<Profile />} />
                    <Route path={"/verify/:id?/:token?"}
                    element={<Verify />} />
            </Routes>
        </section>
    )
}