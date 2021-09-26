import backArrow from '../../images/yanni/arrow-left.svg'
import userPhoto from '../../images/yanni/userPhoto.svg'
import { NavLink} from "react-router-dom";

function ProfileBody(){
    return(
        <div className = "profileBody">
            <NavLink style={{textDecoration:'none' }} to="/" className = "backButton">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span style={{color:'black' }}>Back</span>
            </NavLink>

            <p className="profileNametag">My Account</p>

            
            <div className = "profileMain">
                <div>
                    <div className="profileForm">
                        <div style={{textAlign:"center"}}>
                            <img src={userPhoto} alt="user's selfie" style={{height: "10rem", width: "10rem", margin:"1rem 1rem"}}></img>
                        </div>

                        {/*TODO: Save these information*/}
                        <div className="inputPair">
                            <label htmlFor="email" className="profileTitle">Email</label>
                            <div className="profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Full Name</label>
                            <div className="profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Self Introduction</label>
                            <div className="profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                        </div>
                        
                        <div className="inputPair">
                            <label htmlFor="phoneNum" className="profileTitle">Phone Number</label>
                            <div className="profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                        </div>               

                        <div className="inputPair">
                            <label htmlFor="fullName" className="profileTitle">Address</label>
                            <div className="profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                        </div>

                        <div className = "alignForm">
                            <div className = "alignContent">
                                <div className="profileTitle"><label htmlFor="age">Age</label></div>
                                <div className = "profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                            </div>
                            <div className = "alignContent">
                                <div className="profileTitle"><label htmlFor="gender">Gender</label></div>
                                <div className = "profileInput" style={{border:"1px black solid", borderRadius:"1rem"}} />
                            </div>
                        </div>

                        {/*TODO: Click button then create a new account and dump to memu page*/}
                        <div className="inputPair"><NavLink to="/profile-edit" id="button" className="profileButton">Edit Profile</NavLink></div>
                        <div className="inputPair"><NavLink to="/" id="button" className="profileButton" style={{backgroundColor:"#FF7B7B"}}>Log out</NavLink></div>
                    </div>
                </div>
            </div>

            <div className="profileBack" />
        </div>
    )
}export default ProfileBody;