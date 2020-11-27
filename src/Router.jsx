import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Login from './pages/login/Login'
import Register from './pages/register/Register'

class MyRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Redirect exact to="/login" from='/' />
        </Switch>
      </Router>
    );
  }
}

export default MyRouter;
