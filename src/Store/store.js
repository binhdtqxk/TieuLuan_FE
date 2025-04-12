import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { twitReducer } from "./twit/Reducer";

const rootReducers=combineReducers({
    auth:authReducer,
    twit:twitReducer,
});

export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))
