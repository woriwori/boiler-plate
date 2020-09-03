import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/login" component={LoginPage}></Route>
                    <Route exact path="/register" component={RegisterPage}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
