import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import pages
import Register from '../src/pages/register';
import Login from "./pages/login";
import Home from "./pages/home";
import AddAgenda from "./pages/AddAgenda.js";

function App() {

  return (
    <Router>
      <Switch>
        {/* register page */}
        <Route exact path="/register">
          <Register />
        </Route>

        {/* login page */}
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/addAgenda">
          <AddAgenda />
        </Route>
      
      </Switch>
    </Router>

  );
}

export default App;
