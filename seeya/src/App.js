import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import pages
import Register from '../src/pages/register';
import Login from "./pages/login.js";
import Homepage from "./pages/homepage.js"


function App() {

  return (
    <Router>
      <Switch>
        {/* homepage */}
        <Route exact path="/">
          <Homepage />
        </Route>
        
        {/* register page */}
        <Route exact path="/register">
          <Register />
        </Route>

        {/* login page */}
        <Route exact path="/login">
          <Login />
        </Route>
      
      </Switch>
    </Router>

  );
}

export default App;
