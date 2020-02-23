import React from 'react';
import './App.css';
import Workspace from './pages/Workspace';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App(props) {
  return  (
    <Router>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={
            routeProps => <Workspace {...routeProps} {...props} />
        }/>
        <Route
          path="/dashboard"
          render={
            routeProps => <Dashboard {...routeProps} {...props} />
        }/>
      </Switch>
    </Router>
  );
}

export default App;
