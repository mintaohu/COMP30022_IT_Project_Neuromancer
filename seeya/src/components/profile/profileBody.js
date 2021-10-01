import backArrow from '../../images/yanni/arrow-left.svg'
import userPhoto from '../../images/yanni/userPhoto.svg'
import { NavLink} from "react-router-dom";

function ProfileBody(){

    //Back Function
    const BackToLastPage = (event) => {
        window.history.back(-1)
    }

    return(
        <div className = "profileBody">
            {/* Click Back Button to back to last page */}
            <div className = "backButton" onClick={BackToLastPage}>
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span style={{color:'black' }}>Back</span>
            </div>

            {/* Name tag -- Name of the current page */}
            <p className="profileNametag">My Account</p>

            {/* Main Section in this page is to display the account information*/}
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

                        {/* Click Edit Profile and jump to edit page*/}
                        <div className="inputPair"><NavLink to="/profile-edit" id="button" className="profileButton">Edit Profile</NavLink></div>
                        {/*TODO: Click Log Out to log out the account and jump to homepage*/}
                        <div className="inputPair"><NavLink to="/" id="button" className="profileButton" style={{backgroundColor:"#FF7B7B"}}>Log out</NavLink></div>
                    </div>
                </div>
            </div>

            <div className="profileBack" />
        </div>
    )
}export default ProfileBody;