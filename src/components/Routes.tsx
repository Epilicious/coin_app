import React, { ReactElement } from "react";
import { Route, Switch } from "react-router";
import CoinDetails from "./CoinDetails";
import CoinList from "./CoinList";
import Home from "./Home";

function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/coins/:id">
        <CoinDetails />
      </Route>
      <Route path="/coins">
        <CoinList />
      </Route>
    </Switch>
  );
}

export default Routes;
