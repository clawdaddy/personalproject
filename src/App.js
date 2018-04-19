import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';



class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path = '/' component = { Login } />
          <Route path = '/dashboard' component = { Dashboard } />
        </Switch>
      </div>
    );
  }
}

export default App;
