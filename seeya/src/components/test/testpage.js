import backArrow from '../../images/yanni/arrow-left.svg';
import { NavLink } from "react-router-dom";
import { useUserEmail } from "../../api/test.js";

{/* ONLY FOR TEST */}
function GetEmail() {

    const { loading, email, error } = useUserEmail();

    console.log(email);

    console.log(useUserEmail);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>
    }

    return (
        <h1>{email}</h1>
    )
}

function TestPage(){
    return(
        <div className = "registerBody">
            <NavLink style={{textDecoration:'none' }} to="/" className = "backButton">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <span style={{color:'black' }}>Back</span>
            </NavLink>

            <div>
                <h1>Miro's Email is</h1>
                {GetEmail()};
            </div>
        </div>
    )
} export default TestPage;
