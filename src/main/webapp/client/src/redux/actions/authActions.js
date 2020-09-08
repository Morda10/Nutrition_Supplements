import {
  SET_USER,
  SET_TOKEN,
  SET_WISHLIST,
  SET_ITEMS,
  SET_CART,
  SET_USER_LOGOUT,
} from "../types";
import jwt_decode from "jwt-decode";

export const setUser = (token, user) => {
  return {
    type: SET_USER,
    userDetails: { id: user.id, username: user.username },
    payload: jwt_decode(token),
  };
};

export const setWishes = (wishlist) => {
  return {
    type: SET_WISHLIST,
    payload: { wishlist: wishlist, count: wishlist.length },
  };
};

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const setToken = (token) => {
  // localStorage.setItem("jwt", token);
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: { cart: cart, count: cart.length },
  };
};

export const logout = () => {
  localStorage.removeItem("persist:root");
  return {
    type: SET_USER_LOGOUT,
    payload: null,
  };
};
