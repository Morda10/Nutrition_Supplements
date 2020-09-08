import React, { Fragment, useState, useEffect } from "react";
import Login from "./Login_Register/Login";
import { Items } from "./Items/Items";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MyNavbar from "./UI/Navbar/MyNavbar";
import Register from "./Login_Register/Register";
import { Wishlist } from "./Wishlist/Wishlist";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";

function App() {
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
    <Router>
      <Fragment>
        <MyNavbar routing={routing} />
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Items" component={Items} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Wishlist" component={Wishlist} />
          <Route exact path="/ShoppingCart" component={ShoppingCart} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
