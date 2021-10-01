import HomepageHeader from '../components/homepage/homepageHeader.js' 
import HomepageBody from '../components/homepage/homepageBody.js' 
import '../css/homepage.css'

//Homepage before login
function Homepage(){ 
    return (
        <div className="homepage">
            <HomepageHeader />
            <HomepageBody />
        </div>
    ) 
} export default Homepage;