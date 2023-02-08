import './Header.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { selectIsAuthenticated } from '../../features/loginSlice';
import { useSelector } from 'react-redux';
import { UserNav } from './UseNav';
import { GuestNav } from './GuestNav';

export const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
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

            <nav className="general-nav" id="bottomHeader">
                <ul className="list-general" id="bottom-ul">
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
            </nav>
        </div>
    )
}