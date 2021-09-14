import './App.css';

//Import pages
import Login from "./pages/login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
