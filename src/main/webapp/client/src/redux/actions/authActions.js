import { SET_USER, SET_TOKEN } from "../types";
import jwt_decode from "jwt-decode";

export const setUser = (token) => {
  localStorage.setItem("jwt", token);
  return {
    type: SET_USER,
    payload: jwt_decode(token),
  };
};

export const setToken = (token) => {
  localStorage.getItem("jwt", token);
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: SET_USER,
    payload: null,
  };
};
