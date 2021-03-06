import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';
import { Provider } from 'react-redux';
import store from './store'

import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';


class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div className="App">
            <AppNavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={ UserIsAuthenticated(Dashboard) }></Route>
                <Route exact path='/client/add' component={ UserIsAuthenticated(AddClient) }></Route>
                <Route exact path='/client/edit/:id' component={ UserIsAuthenticated(EditClient) }></Route>
                <Route exact path='/client/:id' component={ UserIsAuthenticated(ClientDetails) }></Route>
                <Route exact path='/login' component={ UserIsNotAuthenticated(Login) }></Route>
                <Route exact path='/settings' component={ UserIsAuthenticated(Settings) }></Route>
                <Route exact path='/register' component={ UserIsNotAuthenticated(Register) }></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
