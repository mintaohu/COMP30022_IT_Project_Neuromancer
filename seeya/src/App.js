import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import pages
import Register from '../src/pages/register';
import Home from "./pages/home";
import AddAgenda from "./pages/AddAgenda.js";
import Login from "./pages/login.js";
import Homepage from "./pages/homepage.js";
import Test from "./pages/test.js";
import Profile from "./pages/profile.js";
import ProfileEdit from "./pages/profileEdit.js";


function App() {

  return (
    <Router>
      <Switch>
        {/* homepage before login*/}
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
        
        {/* homepage after login page */}
        <Route exact path="/home">
          <Home />
        </Route>

        {/* Add new agenda page */}
        <Route exact path="/addAgenda">
          <AddAgenda />
        </Route>

        {/* Special page for testing APIs and will delete after finishing*/}
        <Route exact path="/test">
          <Test />
        </Route>
      
        {/* account profile */}
        <Route exact path="/profile">
          <Profile />
        </Route>

        {/* account profile */}
        <Route exact path="/profile-edit">
          <ProfileEdit />
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
