// import {
//   SET_USER,
//   SET_TOKEN,
//   SET_WISHLIST,
//   SET_ITEMS,
//   SET_CART,
//   SET_USER_LOGOUT,
// } from "../types";
import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setWishes = createAction("setWishes");
export const setItems = createAction("setItems");
export const setCart = createAction("setCart");

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  wishlist: [],
  cart: [],
  wishesCount: 0,
  cartCount: 0,
  items: [],
};

export const UserReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = jwt_decode(action.payload.user);
    state.userDetails = action.payload.userDetails;
    return state;
  },
  [logout]: (state) => {
    localStorage.removeItem("persist:root");
    state = {
      user: null,
      userDetails: null,
      token: null,
      wishlist: [],
      cart: [],
      wishesCount: 0,
      cartCount: 0,
      items: [],
    };
    return state;
  },
  [setToken]: (state, action) => {
    state.token = action.payload.token;
    return state;
  },
  [setWishes]: (state, action) => {
    state.wishlist = action.payload.wishlist;
    state.wishesCount = action.payload.wishlist.length;
    return state;
  },
  [setItems]: (state, action) => {
    state.items = action.payload.items;
    return state;
  },
  [setCart]: (state, action) => {
    state.cart = action.payload.cart;
    state.cartCount = action.payload.cart.length;
    return state;
  },
});

// export const UserReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         user: action.payload,
//         userDetails: action.userDetails,
//       };
//     case SET_USER_LOGOUT:
//       return {
//         ...state,
//         user: null,
//         userDetails: null,
//         token: null,
//         wishlist: null,
//         cart: null,
//         wishesCount: 0,
//         cartCount: 0,
//         items: null,
//       };
//     case SET_TOKEN:
//       return {
//         ...state,
//         token: action.payload,
//       };
//     case SET_WISHLIST:
//       return {
//         ...state,
//         wishlist: action.payload.wishlist,
//         wishesCount: action.payload.count,
//       };
//     case SET_ITEMS:
//       return {
//         ...state,
//         items: action.payload,
//       };
//     case SET_CART:
//       return {
//         ...state,
//         cart: action.payload.cart,
//         cartCount: action.payload.count,
//       };

//     default:
//       return state;
//   }
// };
