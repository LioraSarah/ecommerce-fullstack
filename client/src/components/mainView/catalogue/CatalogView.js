import React, { useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  setCategorie,
  setProducts
} from '../../../features/catalogSlice';
import { setCurrentProduct } from '../../../features/currentProductSlice';
import "./CatalogueView.css";

export function CatalogueView() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    dispatch(setProducts(data));
  }

  const {
    data: products,
    status,
    refetch
  } = useQuery(["products"], async () => {
    const res = await axios.get("https://ecommerce-server-9r5x.onrender.com/catalogue", { params: { category: category } });
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
  }, [category, dispatch]);

  if (status === "loading") {
    return <h2>Loading...</h2>
  }

  function handleMouseOver(e) {
    e.target.nextSibling.className = "visible-hover";
  }

  function handleMouseLeave(e) {
    e.target.nextSibling.className = "hidden-hover";
  }

  function handleClick(e) {
    const id = e.target.closest('a').id;
    const product = products.find((product) => parseInt(id) === product.id);
    dispatch(setCurrentProduct(product));
  }

  return (
    <article id="catalogue-container" className='content-wrapper'>
      <h3 id="category-h3">{category}</h3>
      <div className="catalogue-view">
        {products.map((item) => (
          <div key={item.id} className="catalogue-view-item">
            <NavLink id={item.id} className="link" activeclassname="link-active" to={`/${category}/${item.product_name}`} onClick={handleClick}>
              <img src={`./media/${item.image_url}.png`} alt={item.name} className="itemImg"
                onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} id={item.id}></img>
              <div className="hidden-hover">
                <p className="view-p">view</p>
                {/* <button className="hidden-button" >add to cart</button> */}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </article>
  );
}