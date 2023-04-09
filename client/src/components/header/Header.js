import './Header.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { selectIsAuthenticated } from '../../features/loginSlice';
import { useSelector } from 'react-redux';
import { UserNav } from './UseNav';
import { GuestNav } from './GuestNav';

export const Header = () => {
    // check if user is logged in - in order to show the right navigation bar
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const toggleBtn = document.getElementById('toggleBtn');
    const bottomUl = document.getElementById("bottomUl");

    const toggleActive = () => {
        const bottomUl = document.getElementById("bottomUl");
        bottomUl.classList.toggle('active');
    }
    return (
        <div>
            <div id="topHeader">
                <div id="top-nav">
                    {isAuthenticated ? <UserNav /> : <GuestNav />}
                </div>
                <div id="logo-div">
                    <NavLink to="/">
                        <div id="logo">
                            <h2 id="logo-h2">Knit-Love</h2>
                        </div>
                    </NavLink>
                </div>
            </div>

            <nav className="general-nav navbar-links" id="bottomHeader">
                <div className="toggle-button" id="toggleBtn" onClick={toggleActive}>
                    {/* <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span> */}
                    <span className='toggle-title'>menu</span>
                </div>
                <div id="bottomUl-container">
                    <ul className="list-general" id="bottomUl">
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'link' : 'link-active'
                                }
                                to={`/tops`} >

                                {/* {categories[0]} */}
                                Tops

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'link' : 'link-active'
                                }
                                to={`/bottoms`}>

                                {/* {categories[1]} */}
                                Bottoms

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'link' : 'link-active'
                                }
                                to={`/accessories`}>

                                {/* {categories[2]} */}
                                Accessories

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'link' : 'link-active'
                                }
                                to={`/pets`}>

                                {/* {categories[3]} */}
                                Pets

                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}