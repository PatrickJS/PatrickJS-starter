import React from 'react';
import './App.css';
import Workspace from './pages/Workspace';
import Dashboard from './pages/Dashboard';
import {send} from './services/local-api'
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    send({event: 'location', payload: location.pathname});
  }, [location]);
}

function App(props) {
  usePageViews();
  return  (
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
  );
}

export default App;
