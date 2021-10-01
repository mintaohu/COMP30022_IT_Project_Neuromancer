import ProfileHeader from "../components/profile/profileHeader";
import ProfileBody from "../components/profile/profileBody";
import "../css/profile.css";

//Display profile page
function Profile(){
    return(
        <div className="profilePage">
            <ProfileHeader />
            <ProfileBody />
        </div>
    )
}export default Profile;