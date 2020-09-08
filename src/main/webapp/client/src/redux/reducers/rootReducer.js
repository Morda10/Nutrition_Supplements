import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // for local storage use
import { UserReducer } from "./UserReducer";
//or
// import storageSession from 'redux-persist/lib/storage/session' // for session storage

const persistConfig = {
  key: "root",
  storage,
  whitlist: ["rootReducer"],
};

const rootReducer = UserReducer;

export default persistReducer(persistConfig, rootReducer);
