import ProfileHeader from "../components/profile/profileHeader";
import ProfileEditForm from "../components/profile/profileEdit";
import "../css/profile.css";


function ProfileEdit(){
    return(
        <div className="profilePage">
            <ProfileHeader />
            <ProfileEditForm />
        </div>
    )
}export default ProfileEdit;