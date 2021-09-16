import react from 'react'
import backArrow from '../../images/yanni/arrow-left.svg'

function RegisterBody(){
    return(
        <div className = "registerBody">
            <div className = "backButton">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span>Back</span>
            </div>

            <div className = "registerMain">
                <form action="#" method="post">
                    <div className="registerForm">
                        {/*TODO: Save these information*/}
                        <label htmlFor="email" className="registerTitle">Email</label>
                        <input type="text" name="username" id="username" className="registerInput" />

                        <label htmlFor="password" className="registerTitle"> Password</label>
                        <input type="password" name="pwd" id="password" className="registerInput" />

                        <label htmlFor="confirmedPassword" className="registerTitle">Confirmed Password</label>
                        <input type="confirmedPassword" name="confirmedPwd" id="confirmedPassword" className="registerInput" />

                        <label htmlFor="fullName" className="registerTitle">Full Name</label>
                        <input type="text" name="username" id="fullName" className="registerInput" />


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

                        {/*TODO: Click button then create a new account and dump to memu page*/}
                        <div><input type="submit" value="Confirm" id="button" className="registerButton" /></div>
                    </div>
                </form>
            </div>
        </div>
    )
} export default RegisterBody;
