import logo from '../../images/yanni/seeya-logo.svg'

function RegisterHeader() {

    return (
        // Header Component on Register Page 
        <div className = "registerHeader" >
            <img src = { logo } className = "logo" alt = "seeya" ></img>
        </div>

    );
}


export default RegisterHeader;