// import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";
import {
  configureStore,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [logger, ...getDefaultMiddleware()],
// });
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

export const persistor = persistStore(store); // cache store

export default { store, persistor };
