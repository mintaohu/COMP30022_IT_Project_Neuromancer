import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import pages
import Register from '../src/pages/register';
import Home from "./pages/home";
import AddAgenda from "./pages/AddAgenda.js";
import Login from "./pages/login.js";
import Homepage from "./pages/homepage.js";


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
        
        {/* homepage after login page */}
        <Route exact path="/home">
          <Home />
        </Route>

        {/* Add new agenda page */}
        <Route exact path="/addAgenda">
          <AddAgenda />
        </Route>
      
      </Switch>
    </Router>

  );
}

export default App;
