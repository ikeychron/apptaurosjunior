import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// React-Redux
import { connect } from "react-redux";

// Components
import Login from "./components/Login";
import Home from "./components/Home";

const App = ({ token }) => {
  return (
    <Router>
      {token ? (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      )}
    </Router>
  );
};

const mapStateToProps = ({ Login: { token } }) => ({
  token
});

export default connect(mapStateToProps)(App);
