import logo from '../../images/yanni/seeya-logo.svg'
import { NavLink} from "react-router-dom";

function HomepageHeader() {

    return (

        <div className = "homepageHeader" >
            <img src = { logo } className = "logo" alt = "seeya" ></img>
            <NavLink to="/login" className = "headerButton">Login</NavLink>
            <NavLink to="/register" className = "headerButton">Register</NavLink>
        </div>

    );
}


export default HomepageHeader;