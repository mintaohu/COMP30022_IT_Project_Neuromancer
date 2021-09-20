import HomepageHeader from '../components/homepage/homepageHeader.js' 
import HomepageBody from '../components/homepage/homepageBody.js' 
import '../css/register.css'

function Homepage(){ 
    return (
        <div className="homePage">
            <HomepageHeader />
            <HomepageBody />
        </div>
    ) 
} export default Homepage;