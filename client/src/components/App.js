import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import auth from '../hoc/auth';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={auth(LandingPage, null)}
                    ></Route>
                    <Route
                        exact
                        path="/login"
                        component={auth(LoginPage, false)}
                    ></Route>
                    <Route
                        exact
                        path="/register"
                        component={auth(RegisterPage, false)}
                    ></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
