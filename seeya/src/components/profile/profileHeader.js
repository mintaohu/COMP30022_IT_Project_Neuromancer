import logo from '../../images/yanni/seeya-logo.svg';

function ProfileHeader(){
    return(
        <div className = "profileHeader">
            <img src = { logo } className = "logo" alt = "seeya" ></img>
        </div>
    )
}export default ProfileHeader;