import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Feed from './components/Feed';
import Logout from './components/Logout';
import Signup from './components/Signup';

import withAuthentication from './hocs/with-authentication';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={withAuthentication(Feed)} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </HashRouter>
  );
}

export default App;
