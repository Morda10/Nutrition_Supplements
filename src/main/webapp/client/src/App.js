import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MyNavbar from "./UI/Navbar/MyNavbar";
import Login from "./Components/Login_Register/Login";
import { Items } from "./Components/Items/Items";
import { GuestItems } from "./Components/Items/Guest/GuestItems";
import Register from "./Components/Login_Register/Register";
import { Wishlist } from "./Components/Wishlist/Wishlist";
import { ShoppingCart } from "./Components/ShoppingCart/ShoppingCart";
import UserRoute from "./Components/Protected Routes/UserRoute";
import { ItemPage } from "./Components/Items/ItemPage";

function App() {
  const user = useSelector((state) => state.user);

  const [routing, setRouting] = useState([
    { to: "/Login", name: "Login" },
    { to: "/Register", name: "Register" },
  ]);

  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    if (user) {
      setRouting([{ to: "/", name: "Home" }]);
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }, [user]);

  return (
    <Router>
      <Fragment>
        <MyNavbar routing={routing} isLogged={isLogged} />
        <Switch>
          <Route exact path="/" component={GuestItems} />
          <UserRoute exact path="/Home" component={Items} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <UserRoute exact path="/Wishlist" component={Wishlist} />
          <UserRoute exact path="/ShoppingCart" component={ShoppingCart} />
          <Route exact path="/ItemPage/:itemId" component={ItemPage} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
