//import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
// import PostPreviews from '../home/PostPreviews';
import { selectCategories } from '../../features/catalogSlice';


//this component is currently not in use
export const Sidebar = () => {
    //const categories = useSelector(selectCategories);

    return (
        <div id="sidebar-container">
            <nav id="sideNav">
                <ul className="list-general" id="sidebar-list">
                    <li className="sidebar-li">
                        <NavLink 
                            className={({ isActive }) =>
                            isActive ? 'link' : 'link-active'
                          }
                            to={`/catalogue/tops`} >

                                {/* {categories[0]} */}
                                Tops

                        </NavLink>
                    </li>
                    <li className="sidebar-li">
                        <NavLink 
                            className={({ isActive }) =>
                            isActive ? 'link' : 'link-active'
                          }
                            to={`/catalogue/bottoms`}>

                                {/* {categories[1]} */}
                                Bottoms

                        </NavLink>
                    </li>
                    <li className="sidebar-li">
                        <NavLink 
                            className={({ isActive }) =>
                            isActive ? 'link' : 'link-active'
                          }
                            to={`/catalogue/accessories`}>

                                {/* {categories[2]} */}
                                Accessories

                        </NavLink>
                    </li>
                    <li className="sidebar-li">
                        <NavLink 
                            className={({ isActive }) =>
                            isActive ? 'link' : 'link-active'
                          }
                            to={`/catalogue/pets`}>

                                {/* {categories[3]} */}
                                Pets
                                
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}