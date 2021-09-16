import RegisterHeader from '../components/register/registerHeader.js' 
import RegisterBody from '../components/register/registerBody.js' 
import '../css/register.css'

function Register(){ 
    return (
        <div className="registerPage">
            <RegisterHeader />
            <RegisterBody />
        </div>
    ) 
} export default Register;