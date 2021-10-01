import logo from '../../images/yanni/seeya-logo.svg'
import { NavLink} from "react-router-dom";

function HomepageHeader() {

    return (
        //Header of Page
        <div className = "homepageHeader" >
            <img src = { logo } className = "logo" alt = "seeya" ></img>
            {/* Users can go through login or sign up */}
            <div className = "rightEntrances">
                <div className = "homepageButton" style = {{backgroundColor:"white",border: "1px black solid"}}>
                    <NavLink to="/login" className = "innerLink" style = {{color:"black"}}>Login</NavLink>
                </div>
                <div className = "homepageButton">
                    <NavLink to="/register" className = "innerLink">Register</NavLink>
                </div>
            </div>
        </div>


    );
}


export default HomepageHeader;