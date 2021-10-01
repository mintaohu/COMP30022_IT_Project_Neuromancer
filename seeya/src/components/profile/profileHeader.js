import logo from '../../images/yanni/seeya-logo.svg';

function ProfileHeader(){
    return(
        //Header of page
        <div className = "profileHeader">
            <img src = { logo } className = "logo" alt = "seeya" ></img>
        </div>
    )
}export default ProfileHeader;