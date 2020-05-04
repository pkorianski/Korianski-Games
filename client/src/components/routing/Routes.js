import React from "react";
import { Route, Switch } from "react-router-dom";

//// Games
// Palace
import PalaceMain from "../games/palace/PalaceMain";
import PalaceSoloBoard from "../games/palace/solo/PalaceSoloBoard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/palace" component={PalaceMain} />
      <Route exact path="/palace/solo" component={PalaceSoloBoard} />
    </Switch>
  );
};

export default Routes;
