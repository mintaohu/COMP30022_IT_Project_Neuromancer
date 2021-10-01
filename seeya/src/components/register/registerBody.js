import backArrow from '../../images/yanni/arrow-left.svg'
import { NavLink} from "react-router-dom";

function RegisterBody(){
    return(
        <div className = "registerBody">
            {/* Click Back Button to back to the homepage */}
            <NavLink style={{textDecoration:'none' }} to="/" className = "backButton">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span style={{color:'black' }}>Back</span>
            </NavLink>

            {/* Register Form for users to input */}
            <p className="registerNametag">Register</p>

            <div className = "registerMain">
                <form action="#" method="post">
                    <div className="registerForm">
                        {/*TODO: Save these information*/}
                        <div className="inputPair">
                            <label htmlFor="email" className="registerTitle">Email</label>
                            <input type="text" id="username" className="registerInput" />
                        </div>

                        <div className="inputPair">
                            <label htmlFor="password" className="registerTitle"> Password</label>
                            <input type="password" id="password" className="registerInput" />
                        </div>

                        <div className="inputPair">
                            <label htmlFor="confirmedPassword" className="registerTitle">Confirmed Password</label>
                            <input type="confirmedPassword" id="confirmedPassword" className="registerInput" />
                        </div>

                        <div className="inputPair">
                            <label htmlFor="fullName" className="registerTitle">Full Name</label>
                            <input type="text" id="fullName" className="registerInput" />
                        </div>

                        <div className = "alignForm">
                            <div className = "alignContent">
                                <div className="registerTitle"><label htmlFor="age">Age</label></div>
                                <div><input type="number" name="username" id="age" className = "registerInput" /></div>
                            </div>
                            <div className = "alignContent">
                                <div className="registerTitle"><label htmlFor="gender">Gender</label></div>
                                <div><input type="text" name="username" id="gender" className = "registerInput" /></div>
                            </div>
                        </div>

                        {/*TODO: Click button then create a new account and and jump to the login page*/}
                        <div className="inputPair"><input type="submit" value="Confirm" id="button" className="registerButton" /></div>
                    </div>
                </form>
            </div>

            <div className="registerBack" />
        </div>
    )
} export default RegisterBody;
