import backArrow from '../../images/yanni/arrow-left.svg'
import userPhoto from '../../images/yanni/userPhoto.svg'
import { NavLink} from "react-router-dom";

function ProfileEditForm(){
    return(
        <div className = "profileBody">
            {/* Click Back Button to back to profile page */}
            <NavLink style={{textDecoration:'none' }} to="/profile" className = "backButton">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span style={{color:'black' }}>Back</span>
            </NavLink>

            {/* Profile Form that users can edit */}
            <p className="profileNametag">Edit Profile</p>

            <div className = "profileMain">
                <form action="#" method="post">
                    <div className="profileForm">
                        <div style={{textAlign:"center"}}>
                            <img src={userPhoto} alt="user's selfie" style={{height: "10rem", width: "10rem", margin:"1rem 1rem"}}></img>
                        </div>

                        <div className="inputPair">
                            <label htmlFor="email" className="profileTitle">Email</label>
                            <input type="text" id="username" className="profileInput" />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Full Name</label>
                            <input type="text" name="username" id="fullName" className="profileInput" />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Self Introduction</label>
                            <input type="text" id="fullName" className="profileInput" />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="phoneNum" className="profileTitle">Phone Number</label>
                            <input type="number" id="phoneNum" className="profileInput" />
                        </div>               

                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Address</label>
                            <input type="text" id="address" className="profileInput" />
                        </div>

                        <div className = "alignForm">
                            <div className = "alignContent">
                                <div className="profileTitle"><label htmlFor="age">Age</label></div>
                                <div><input type="number" id="age" className = "profileInput" /></div>
                            </div>
                            <div className = "alignContent">
                                <div className="profileTitle"><label htmlFor="gender">Gender</label></div>
                                <div><input type="text" id="gender" className = "profileInput" /></div>
                            </div>
                        </div>

                        {/*TODO: Click Save Information to save new changes*/}
                        <div className="inputPair">
                            <NavLink to="/profile" id="button" className="profileButton">Save Information</NavLink>
                        </div>
                        {/*TODO: Click Log Out to log out the account and jump to homepage*/}
                        <div className="inputPair">
                            <NavLink to="/" id="button" className="profileButton" style={{backgroundColor:"#FF7B7B"}}>Log out</NavLink>
                        </div>
                    </div>
                </form>
            </div>
            <div className="profileBack" />
        </div>
    )
}export default ProfileEditForm;