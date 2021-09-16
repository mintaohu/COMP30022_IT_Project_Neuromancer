import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { login } from "../../api/login.js";

function LoginBody() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="Login_body">
            <NavLink style={{textDecoration: 'none' }} to="/" className="Login_back">
                Back
            </NavLink>
            <div className="Background_div" />
            <form onSubmit={() => { login(email, password); }}>
                <div className="Login_log_form">
                    <div className="Login_tag">
                        <p className="Login_nametag">Login</p>
                    </div>
                    <div className="Login_title">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="Login_input">
                        <input
                            className="Login_email"
                            type="text"
                            name="Email"
                            id="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            required=""
                        />
                    </div>

                    <div className="Login_title">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="Login_input">
                        <input
                            className="Login_password"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            required=""
                        />
                    </div>
                    <div className="Login_hint">
                        <NavLink to="/forgot-password" className="Login_getPassword">
                            Forget Password
                        </NavLink>
                        <NavLink to="/sign-up" className="Login_signUp">
                            Sign Up
                        </NavLink>
                    </div>

                    <input className="Login_confirm"
                        type="submit"
                        value="Confirm"
                        id="button"
                    />
                </div>
            </form>
        </div>
    );

}

export default LoginBody;