import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "../features/Auth/reducer";
import jobsReducer from "../features/Jobs/reducer";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);
export default store;
