import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import KGNavbar from "./components/layout/KGNavbar";
import MainMenu from "./components/MainMenu";
import Routes from "./components/routing/Routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <KGNavbar />
          <Switch>
            <Route exact path="/" component={MainMenu} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
