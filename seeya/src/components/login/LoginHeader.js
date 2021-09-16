import React from 'react';
import logo from "../../images/seeya-logo.png"

function LoginHeader() {

    return (

        <div className="Login_header">
            <img src={logo} className="Login_headerImage" alt="Header"></img>
            <hr />
        </div>
    );

}


export default LoginHeader;