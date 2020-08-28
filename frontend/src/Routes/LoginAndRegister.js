import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Register } from '../Screens/Register/Register'
import { Login } from '../Screens/Login/Login';
import './loginAndRegister.css';

export const LoginAndRegister = () => {
    return (
        <div className="cnt-login-register">
            <h1>Alkemy Store</h1>
            <Switch>
                <Route exact path="/register" component={ Register }></Route>
                <Route exact path="/login" component={ Login }></Route>
                <Redirect to="/register" />
            </Switch>
        </div>
    )
}
