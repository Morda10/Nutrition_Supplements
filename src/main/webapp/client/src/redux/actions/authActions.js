import { SET_USER, SET_TOKEN } from "../types";
import jwt_decode from "jwt-decode";

export const setUser = (token, user) => {
  localStorage.setItem("jwt", token);
  localStorage.setItem(
    "userDetails",
    JSON.stringify({
      id: user.id,
      username: user.username,
    })
  );
  return {
    type: SET_USER,
    userDetails: { id: user.id, username: user.username },
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
  localStorage.removeItem("userDetails");
  return {
    type: SET_USER,
    payload: null,
  };
};
