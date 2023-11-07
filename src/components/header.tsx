import React from 'react';
import {NavLink} from "react-router-dom";
import logo from '../assets/лого.svg';


const Header = () => {
    return (
        <header>
            <NavLink className="logo" to={"/"}> <img src={logo} alt=""/> </NavLink>

            <div className="header-nav">
                <NavLink className="link" to={"/"}>Главная</NavLink>
                <NavLink className="link linkml" to={"/myroutes"}>Мои маршруты</NavLink>
            </div>

            <NavLink className="link" to={"/login"}>Войти</NavLink>
        </header>
    );
};

export default Header;