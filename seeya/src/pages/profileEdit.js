import ProfileHeader from "../components/profile/profileHeader";
import ProfileEditForm from "../components/profile/profileEdit";
import "../css/profile.css";

//Edit profile page
function ProfileEdit(){
    return(
        <div className="profilePage">
            <ProfileHeader />
            <ProfileEditForm />
        </div>
    )
}export default ProfileEdit;