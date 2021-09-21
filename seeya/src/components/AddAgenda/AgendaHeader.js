import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../images/seeya-logo.png"

function AgendaHeader() {

    return (

        <div className="Login_header">
            <img src={logo} className="Login_headerImage" alt="Header"></img>
            <div className="navi_div">
            <NavLink to="/">
                <button className="navibutton" style={{backgroundColor:"white", color:"black"}}>Notification</button>
            </NavLink>
            <NavLink to="/">
                <button className="navibutton">My Account</button>
            </NavLink>
            </div>
            <hr />
        </div>
    );

}


export default AgendaHeader;