import React, { useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  setCategorie,
  setProducts,
  selectAllItems
} from '../../../features/catalogSlice';
import { setCurrentProduct } from '../../../features/currentProductSlice';
import "./CatalogueView.css";

export function CatalogueView() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectAllItems);

  const onSuccess = (data) => { //for useQuery
    dispatch(setProducts(data));
  }

  const { //fetch products from backend by category
    data,
    status,
    refetch
  } = useQuery(["products"], async () => {
    const res = await axios.get("/catalogue", { params: { category: category } });
    return res.data;
  },
    {
      onSuccess,
    }
  );

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  useEffect(() => {
    dispatch(setCategorie(category));
    dispatch(setProducts(products));
  }, [category, dispatch, products]);

  if (status === "loading") { //if products are loading
    return <h2 className="loading">Loading...</h2>
  }

  function handleMouseOver(e) { //mouse over a product to show css
    e.target.nextSibling.className = "visible-hover";
  }

  function handleMouseLeave(e) {
    e.target.nextSibling.className = "hidden-hover";
  }

  function handleClick(e) { //clicking on a product will set the current products in the redux state to the clicked product
    const id = e.target.closest('a').id; //find closest element with the product id
    const product = products.find((product) => parseInt(id) === product.id); //find product in products list
    dispatch(setCurrentProduct({ product: product, quantity: 1 })); //set it to current
  }

  function sortByPrice() { //for sorting the products view
    if (products) {
      let productsCopy = [...products];
      productsCopy.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch(setProducts(productsCopy));
    }
  }

  function sortByName() { //for sorting the products view
    if (products) {
      let productsCopy = [...products];
      productsCopy.sort((a, b) => {
        let fa = a.product_name.toLowerCase(),
          fb = b.product_name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      dispatch(setProducts(productsCopy));
    }
  }

  return (
    <article id="catalogue-container" className='content-wrapper'>
      <h3 id="category-h3">{category}</h3>
      <p id="sort-p">
        sort by: <span onClick={sortByName} className="sort">name</span> | <span onClick={sortByPrice} className="sort">price</span>
      </p>
      <div className="catalogue-view">
        {products.map((item) => (
          <div key={item.id} className="catalogue-view-item">
            <NavLink id={item.id} className="link" activeclassname="link-active" to={`/${category}/${item.id}`} onClick={handleClick}>
              <img src={`./media/${item.image_url}.png`} alt={item.name} className="itemImg"
                onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} id={item.id}></img>
              <div className="hidden-hover">
                <p className="view-p">view</p>
                {/* <button className="hidden-button" >add to cart</button> */}
              </div>
            </NavLink>
            <h4 id="productName">{item.product_name}</h4>
            <p id="productPrice">{item.price}$</p>
          </div>
        ))}
      </div>
    </article>
  );
}