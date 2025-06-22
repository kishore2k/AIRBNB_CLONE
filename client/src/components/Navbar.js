import React, { useContext } from "react";
import {Home, Menu, Search, User } from "react-feather";
import {Link} from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../UserContext";

export default function Navbar(){

    const {user} = useContext(UserContext);

    return (
        <div className="navbar">
            <Link to={"/"} className="navbar-logo">
                <Home color="red" size={30}/>
                <h3>Airbnb</h3>
            </Link>

            <div className="navbar-search">
                <span>Anywhere</span>
                <span>|</span>
                <span>Any week</span>
                <span>|</span>
                <span>Add guests</span>
                <Search color="red"/> 
            </div>

            <Link to={user?"/account":"/login"} className="navbar-user">
                <Menu color="black"/>
                <User color="black"/>
                {user && <div><i>{user.name}</i></div>}
            </Link>
            
        </div>
    );
}