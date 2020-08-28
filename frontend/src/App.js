import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Screens/Home/Home';
import { LoginAndRegister } from './Routes/LoginAndRegister';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoutes } from './Routes/PrivateRouter';
import { useSelector } from 'react-redux';
import { Login } from './Screens/Login/Login';
import { Details } from './Screens/Details/Details';

function App() {

  const user = useSelector(state => state);

  return (
      <>
        <Router>
          <div className="cnt-main">
            <Switch>
              <PrivateRoutes path="/me/apps" component={ Home } isAuthenticated={ user.isLogged ? user.isLogged : false }/>
              <PrivateRoutes path="/details/:id" component={ Details } isAuthenticated={ user.isLogged ? user.isLogged : false }/>
              <Route path="/" component={ LoginAndRegister }/>
            </Switch>
          </div>
        </Router>
      </>
    
  );
}

export default App;
