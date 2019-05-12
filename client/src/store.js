import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // plug extension to watch a tracked state in Chrome
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
