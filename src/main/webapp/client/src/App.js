import React, { Fragment, useState, useEffect } from "react";
import Login from "./Login";
import { Items } from "./Items";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
// import Navbar from "./UI/Navbar/Navbar";
import MyNavbar from "./MyNavbar";
import theme from "./UI/Theme";
import Register from "./Register";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginBottom: "2rem",
  },
}));

function App() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [routing, setRouting] = useState([
    { to: "/Login", name: "Login" },
    { to: "/Register", name: "Register" },
  ]);

  useEffect(() => {
    if (user) {
      setRouting([{ to: "/Items", name: "Home" }]);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          {/* <Navbar routing={routing} className={classes.title} /> */}
          <MyNavbar routing={routing} />
          <div style={{ marginBottom: 80 }}>
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Items" component={Items} />
              <Route exact path="/Register" component={Register} />
              {/* <PrivateRoute exact path="/" component={HomePage} /> */}
              {/* <TrainerRoutes
                exact
                path="/TrainerHomePage"
                component={TrainerHomePage}
              /> */}
              {/* <TrainerRoutes exact path="/Register" component={Register} /> */}
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
}

export default App;
