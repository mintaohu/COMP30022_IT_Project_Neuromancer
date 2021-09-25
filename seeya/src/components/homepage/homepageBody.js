import { NavLink} from "react-router-dom";
import rightImg from "../../images/yanni/calendar-image.svg"

function HomepageBody(){
    return(
        <div className="homepageBody">
            <div className = "leftSide">
                <h1>Join Public Agenda</h1>
                <h1>And</h1>
                <h1>Enjoy with Your Dear</h1>
                <p className="webIntro">SeeYa is used to manage your contacts and might remind you where you met people, 
                    the context of meeting, and possibly interesting elements of the discussion.</p>
                <div className="registerEntrance">
                    <input type="text" name="username" id="username" className="homepageInput" placeholder="Enter your email to start"/>
                    <div className = "homepageButton" style={{width:"25%", height:"2.5rem"}}>
                        <NavLink to="/register" className = "innerLink">Register</NavLink>
                    </div>
                </div>
            </div>
            <img src={rightImg} alt="displaying calendar" className="calendarImg"></img>
        </div>
    )
}

export default HomepageBody;