import { SET_USER, SET_TOKEN } from "../types";

const initialState = {
  user: null,
  userDetails: null,
  token: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userDetails: action.userDetails,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};
