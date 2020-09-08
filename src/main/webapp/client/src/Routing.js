import React from "react";
import { Switch } from "@material-ui/core";
import { Route } from "react-router-dom";

export const Routing = ({ routs }) => {
  return (
    <>
      {routs.map((r) => (
        <Route key={r.component} exact path={r.path} component={r.component} />
      ))}
    </>
  );
};
