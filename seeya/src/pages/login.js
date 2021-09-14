import React from "react";
import LoginHeader from '../components/login/LoginHeader.js'
import LoginBody from '../components/login/LoginBody.js'
import "../css/Login.css";

function Login() {

    return (

        <div >
            {/*Header Part*/}
            <LoginHeader />
            <LoginBody />
        </div>
        
    );

}


export default Login;
