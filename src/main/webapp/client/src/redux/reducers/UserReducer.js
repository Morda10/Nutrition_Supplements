import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setWishes = createAction("setWishes");
export const setItems = createAction("setItems");
export const setCart = createAction("setCart");
export const setIsAdmin = createAction("setIsAdmin");
export const setPresentedItems = createAction("setPresentedItems");
export const setNoitems = createAction("setNoitems");

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  wishlist: [],
  cart: [],
  wishesCount: 0,
  cartCount: 0,
  items: [],
  noItemImage:
    "https://res.cloudinary.com/itemsrestcloud/image/upload/v1596906678/none_kqgfrl.png",
  isAdmin: false,
  presentedItems: [],
  noItems: false,
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
      isAdmin: false,
      presentedItems: [],
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
    state.presentedItems = action.payload.items;
    state.noItems = false;
    return state;
  },
  [setCart]: (state, action) => {
    state.cart = action.payload.cart;
    if (action.payload.cart) state.cartCount = action.payload.cart.length;
    return state;
  },
  [setIsAdmin]: (state, action) => {
    state.isAdmin = action.payload.isAdmin;
    return state;
  },
  [setPresentedItems]: (state, action) => {
    state.presentedItems = action.payload.items;
    return state;
  },
  [setNoitems]: (state, action) => {
    state.noItems = action.payload.noItems;
    return state;
  },
});
